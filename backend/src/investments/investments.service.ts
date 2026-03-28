import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InvestmentsService {
  constructor(private prisma: PrismaService) {}

  async purchase(userId: string, data: { propertyId: string; tokenAmount: number; paymentMethod: string }) {
    const { propertyId, tokenAmount } = data;

    if (tokenAmount <= 0) {
      throw new BadRequestException('Token amount must be strictly positive');
    }

    return await this.prisma.$transaction(async (tx) => {
      // 1. Lock property for update and check availability
      const property = await tx.property.findUnique({
        where: { id: propertyId },
      });

      if (!property) throw new NotFoundException('Property not found');
      if (property.status !== 'funding') throw new BadRequestException('Property is not open for funding');
      if (property.availableTokens < tokenAmount) throw new BadRequestException('Not enough available tokens');

      const totalCost = new Prisma.Decimal(tokenAmount).mul(property.pricePerToken);

      // 3. Upsert Investment record 
      const investment = await tx.investment.upsert({
        where: {
          userId_propertyId: { userId, propertyId },
        },
        update: {
          tokenAmount: { increment: tokenAmount },
          totalPaid: { increment: totalCost },
        },
        create: {
          userId,
          propertyId,
          tokenAmount,
          pricePerToken: property.pricePerToken,
          totalPaid: totalCost,
        },
      });

      // 4. Create Transaction record
      const transaction = await tx.transaction.create({
        data: {
          userId,
          propertyId,
          type: 'purchase',
          amount: totalCost,
          tokenAmount,
          description: `Purchased ${tokenAmount} tokens of ${property.name}`,
        },
      });

      // 5 & 6. Update property tokens & amount
      await tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: { decrement: tokenAmount },
          fundedAmount: { increment: totalCost },
          status: property.availableTokens === tokenAmount ? 'funded' : undefined,
        },
      });

      return {
        investment,
        transaction,
        message: `Successfully purchased ${tokenAmount} tokens`,
      };
    });
  }

  async findByUser(userId: string) {
    return this.prisma.investment.findMany({
      where: { userId },
      include: { property: true },
      orderBy: { purchaseDate: 'desc' }
    });
  }

  async findByProperty(propertyId: string) {
    return this.prisma.investment.findMany({
      where: { propertyId },
      include: { user: { select: { id: true, fullName: true } } },
      orderBy: { purchaseDate: 'desc' }
    });
  }
}
