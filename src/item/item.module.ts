import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemsService } from './item.service';
import { ItemsRepository } from './item.repository';
import { ItemsController } from './item.controller';

@Module({
    imports: [PrismaModule],
    providers: [ItemsService, ItemsRepository],
    controllers: [ItemsController],
})
export class ItemModule { }
