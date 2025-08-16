import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { PrismaService } from '../prisma/prisma.service';
import { Item, ItemStatus } from '../../generated/prisma';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  item: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ItemsServiceTest', () => {
  let itemsService: ItemsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const mockItems = [
        {
          id: '1',
          name: 'Test Item',
          description: 'Test Description',
          price: 1000,
          status: ItemStatus.ON_SALE,
          userId: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (prismaService.item.findMany as jest.Mock).mockResolvedValue(mockItems);

      const result = await itemsService.findAll();
      expect(result).toEqual(mockItems);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const mockItem: Item = {
        id: '1',
        name: 'Test Item',
        description: 'Test Description',
        price: 1000,
        status: ItemStatus.ON_SALE,
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prismaService.item.findUnique as jest.Mock).mockResolvedValue(mockItem);

      const result = await itemsService.findById('1');
      expect(result).toEqual(mockItem);
    });

    it('異常系:商品が存在しない場合', async () => {
      (prismaService.item.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(itemsService.findById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
