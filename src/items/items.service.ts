import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../../generated/prisma';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, userId: string): Promise<Item> {
    const { name, price, description } = createItemDto;
    const createdItem = await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        userId,
      },
    });
    return createdItem;
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.prismaService.item.update({
      where: { id },
      data: { status: 'SOLD_OUT' },
    });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  async delete(id: string, userId: string): Promise<Item> {
    const item = await this.prismaService.item.delete({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }
}
