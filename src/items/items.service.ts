import { Injectable } from '@nestjs/common';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
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
