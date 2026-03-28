import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    const investments = await this.prisma.investment.findMany({
      where: { userId, status: 'completed' },
      include: { property: true },
    });

    let totalInvested = new Prisma.Decimal(0);
    let currentValue = new Prisma.Decimal(0);
    let totalTokens = 0;

    investments.forEach((inv) => {
      totalInvested = totalInvested.add(inv.totalPaid);
      
      const currentPrice = inv.property.currentValuation
        ? new Prisma.Decimal(inv.property.currentValuation).dividedBy(inv.property.totalTokens)
        : inv.property.pricePerToken;

      currentValue = currentValue.add(new Prisma.Decimal(inv.tokenAmount).mul(currentPrice));
      totalTokens += inv.tokenAmount;
    });

    const totalReturn = currentValue.minus(totalInvested);
    const returnPercentage = totalInvested.greaterThan(0)
      ? totalReturn.dividedBy(totalInvested).mul(100)
      : new Prisma.Decimal(0);

    return {
      totalInvested: Number(totalInvested.toFixed(2)),
      currentValue: Number(currentValue.toFixed(2)),
      totalReturn: Number(totalReturn.toFixed(2)),
      returnPercentage: Number(returnPercentage.toFixed(2)),
      activeProperties: investments.length,
      totalTokens,
    };
  }

  async getHoldings(userId: string) {
    const investments = await this.prisma.investment.findMany({
      where: { userId, status: 'completed' },
      include: { property: true },
    });

    return investments.map((inv) => {
      const currentPrice = inv.property.currentValuation
        ? new Prisma.Decimal(inv.property.currentValuation).dividedBy(inv.property.totalTokens)
        : inv.property.pricePerToken;

      const currentValue = new Prisma.Decimal(inv.tokenAmount).mul(currentPrice);
      const unrealizedGain = currentValue.minus(inv.totalPaid);
      const gainPercentage = inv.totalPaid.greaterThan(0)
        ? unrealizedGain.dividedBy(inv.totalPaid).mul(100)
        : new Prisma.Decimal(0);

      return {
        property: inv.property,
        investment: inv,
        currentValue: Number(currentValue.toFixed(2)),
        unrealizedGain: Number(unrealizedGain.toFixed(2)),
        gainPercentage: Number(gainPercentage.toFixed(2)),
      };
    });
  }

  async getTransactions(userId: string, query: any) {
    const { page = 1, limit = 20, type } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (type) where.type = type;

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: { property: { select: { id: true, name: true } } }
      }),
      this.prisma.transaction.count({ where })
    ]);

    return {
      data: transactions,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    };
  }
}
