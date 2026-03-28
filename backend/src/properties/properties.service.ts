import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filterDto: any) {
    const { emirate, type, minYield, maxPrice, status, page = 1, limit = 20 } = filterDto;
    
    const where: any = {};
    if (emirate) where.locationEmirate = emirate;
    if (type) where.type = type;
    if (minYield) where.expectedYield = { gte: parseFloat(minYield) };
    if (maxPrice) where.pricePerToken = { lte: parseFloat(maxPrice) };
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.property.count({ where })
    ]);

    return {
      data,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    };
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        _count: {
          select: { investments: true }
        }
      }
    });

    if (!property) throw new NotFoundException('Property not found');
    return property;
  }

  async create(data: any) {
    return this.prisma.property.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.property.update({
      where: { id },
      data
    });
  }
}
