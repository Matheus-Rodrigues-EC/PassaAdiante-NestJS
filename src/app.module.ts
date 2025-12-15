import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemModule } from './item/item.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, ItemModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
