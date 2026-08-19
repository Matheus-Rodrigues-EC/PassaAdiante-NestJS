import { Test } from '@nestjs/testing';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  it('creates a new user through the repository', async () => {
    const repository = {
      create: jest
        .fn()
        .mockResolvedValue({ id: '1', email: 'ana@example.com' }),
    };
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: repository },
      ],
    }).compile();
    const result = await module.get(UsersService).createUser({
      name: 'Ana',
      email: 'ana@example.com',
      password: '12345678',
    });
    expect(result).not.toHaveProperty('password');
    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
