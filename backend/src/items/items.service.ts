import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        name: dto.name,
        description: dto.description,
        startPrice: dto.startPrice,
        endsAt: new Date(Date.now() + dto.durationSeconds * 1000),
      },
    });
  }

  findAll() {
    return this.prisma.item.findMany({
      include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
    });
  }

  findOne(id: number) {
    return this.prisma.item.findUnique({
      where: { id },
      include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
    });
  }
}
