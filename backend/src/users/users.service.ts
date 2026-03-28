import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  walletAddress?: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: { select: { investments: true } },
      },
    });

    if (!user) return null;
    const { password, ...result } = user;

    const investments = await this.prisma.investment.findMany({
      where: { userId, status: 'completed' },
    });
    const totalInvested = investments.reduce(
      (sum, inv) => sum + Number(inv.totalPaid),
      0,
    );

    return {
      ...result,
      investmentsCount: result._count.investments,
      totalInvested,
    };
  }

  async updateProfile(userId: string, data: Record<string, unknown>) {
    const allowedUpdates: UpdateProfileData = {};
    if (typeof data.fullName === 'string') allowedUpdates.fullName = data.fullName;
    if (typeof data.phone === 'string') allowedUpdates.phone = data.phone;
    if (typeof data.walletAddress === 'string') allowedUpdates.walletAddress = data.walletAddress;

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: allowedUpdates,
    });

    const { password, ...result } = user;
    return result;
  }
}
