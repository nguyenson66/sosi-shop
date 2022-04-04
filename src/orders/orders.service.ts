import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { Product } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { createQueryBuilder } from 'typeorm';
import { AddProductToCartDto } from './dto/add-product-cart.dto';
import { OrderDetail } from './order-detail.entity';
import { Order } from './orders.entity';
import { OrderDetailRepository, OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,

    @InjectRepository(OrderDetailRepository)
    private orderDetailRepository: OrderDetailRepository,

    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
}
