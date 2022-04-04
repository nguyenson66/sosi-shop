import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersModule } from 'src/orders/orders.module';
import {
  OrderDetailRepository,
  OrderRepository,
} from 'src/orders/orders.repository';
import { ProductModule } from 'src/product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([OrderRepository, OrderDetailRepository]),
    OrdersModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
