import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemsService } from './item.service';
import { ItemsRepository } from './item.repository';

@Module({
    imports: [PrismaModule],
    providers: [ItemsService, ItemsRepository],
})
export class ItemModule { }
