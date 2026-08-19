import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUser } from '../auth/auth.types.js';
import { UserType } from '../generated/prisma/enums.js';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';
import { ItemFilters, ItemsRepository } from './item.repository.js';

@Injectable()
export class ItemsService {
  constructor(private readonly items: ItemsRepository) {}
  createItem(user: AuthUser, input: CreateItemDto) {
    return this.items.create(user.sub, input);
  }
  findAllItems(filters?: ItemFilters) {
    return this.items.findAll(filters);
  }
  async findOneItem(id: string) {
    const item = await this.items.findOne(id);
    if (!item) throw new NotFoundException('Item não encontrado');
    return item;
  }
  async updateItem(user: AuthUser, id: string, input: UpdateItemDto) {
    const item = await this.findOneItem(id);
    if (item.userId !== user.sub && user.type !== UserType.ADMIN)
      throw new ForbiddenException(
        'Somente o doador ou administrador pode alterar este item',
      );
    return this.items.update(id, input);
  }
  async removeItem(user: AuthUser, id: string) {
    const item = await this.findOneItem(id);
    if (item.userId !== user.sub && user.type !== UserType.ADMIN)
      throw new ForbiddenException(
        'Somente o doador ou administrador pode excluir este item',
      );
    return this.items.remove(id);
  }
}
