import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { ProductRepository } from 'src/product/product.repository';
import { OrdersController } from './orders.controller';
import { OrderDetailRepository, OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderDetailRepository,
      ProductRepository,
    ]),
    AuthModule,
    ProductModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
