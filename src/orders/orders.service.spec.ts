import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  ItemAvailability,
  ItemCategory,
  ItemCondition,
  UserType,
} from '../generated/prisma/enums.js';
import { ItemsRepository } from '../item/item.repository.js';
import { OrdersRepository } from './orders.repository.js';
import { OrdersService } from './orders.service.js';

describe('OrdersService', () => {
  const item = {
    id: 'item-1',
    userId: 'donor-1',
    name: 'Mochila',
    description: null,
    category: ItemCategory.BACKPACK,
    condition: ItemCondition.GOOD,
    availability: ItemAvailability.AVAILABLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { id: 'donor-1', name: 'Doador' },
    orders: [],
  };
  it('blocks requests for the user own donation', async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: {} },
        {
          provide: ItemsRepository,
          useValue: { findOne: jest.fn().mockResolvedValue(item) },
        },
      ],
    }).compile();
    await expect(
      module
        .get(OrdersService)
        .create(
          { sub: 'donor-1', email: 'd@a.com', type: UserType.DONOR },
          { itemId: item.id },
        ),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
