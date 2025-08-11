import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../../generated/prisma';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;
    const createdItem = await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        // TODO: 実際のユーザーIDを取得する
        userId: '00000000-0000-0000-0000-000000000000',
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

  async delete(id: string): Promise<Item> {
    const item = await this.prismaService.item.delete({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }
}
