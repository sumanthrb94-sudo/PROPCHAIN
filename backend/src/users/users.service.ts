import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: { investments: true }
        }
      }
    });

    if (!user) return null;
    const { password, ...result } = user;
    
    // Calculate total invested
    const investments = await this.prisma.investment.findMany({
      where: { userId, status: 'completed' },
    });
    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.totalPaid), 0);

    return {
      ...result,
      investmentsCount: result._count.investments,
      totalInvested,
    };
  }

  async updateProfile(userId: string, data: any) {
    const allowedUpdates = {
      fullName: data.fullName,
      phone: data.phone,
      walletAddress: data.walletAddress,
    };
    
    // Filter undefined
    Object.keys(allowedUpdates).forEach(key => allowedUpdates[key] === undefined && delete allowedUpdates[key]);

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: allowedUpdates,
    });
    
    const { password, ...result } = user;
    return result;
  }
}
