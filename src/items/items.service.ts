import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../../generated/prisma';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}
  private items: Item[] = [];
  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item | undefined {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const createdItem = await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
      },
    });
    return createdItem as Item;
  }

  updateStatus(id: string): Item | undefined {
    const item = this.findById(id);
    if (!item) {
      return undefined;
    }
    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string): Item | undefined {
    const item = this.findById(id);
    if (!item) {
      return undefined;
    }
    this.items = this.items.filter((item) => item.id !== id);
    return item;
  }
}
