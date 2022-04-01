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

  checkCartExistAndGetId(user: User): Promise<Order> {
    return this.orderRepository.checkCartExistAndGetId(user);
  }

  async addProductToCart(
    user: User,
    addProductToCartDto: AddProductToCartDto,
  ): Promise<OrderDetail> {
    const order = await this.checkCartExistAndGetId(user);

    const { product_id, quantity } = addProductToCartDto;

    try {
      const product = await this.productRepository.findOne({ id: product_id });

      if (!product) {
        throw new NotFoundException();
      }

      const productCart = this.orderDetailRepository.create({
        order,
        product,
        quantity,
      });

      const result = await this.orderDetailRepository.save(productCart);

      return result;
    } catch (error) {
      throw new NotFoundException(`Product ID ${product_id} not found`);
    }
  }

  // bug ................
  async getAllProductInCart(user: User) {
    try {
      const cart_id = await this.orderRepository.getIdCart(user);
      console.log(cart_id);

      const query = createQueryBuilder('order_detail').innerJoinAndSelect(
        'order_detail.product_id',
        'product.id',
      );

      const result = await query.getMany();

      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
