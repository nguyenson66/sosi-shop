import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersModule } from 'src/orders/orders.module';
import {
  OrderDetailRepository,
  OrderRepository,
} from 'src/orders/orders.repository';
import { ProductRepository } from 'src/product/product.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderDetailRepository,
      ProductRepository,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
