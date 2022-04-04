import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { Product } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { createQueryBuilder } from 'typeorm';
import { StatusOrder } from './enum/order-status.enum';
import { OrderDetail } from './order-detail.entity';
import { Order } from './orders.entity';
import { OrderDetailRepository, OrderRepository } from './orders.repository';
import * as monment from 'moment';

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

  /// method GET

  async getListOrder(user: User): Promise<Order[]> {
    try {
      const orders = this.orderRepository
        .createQueryBuilder('order')
        .innerJoinAndSelect('order.orderDetail', 'order_detail')
        .innerJoinAndSelect('order_detail.product', 'product')
        .andWhere('order.userId = :userId', { userId: user.id })
        .andWhere('order.status != :statusOrder', { statusOrder: 'CART' });

      const res = await orders.getMany();

      return res;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  /// method POST

  async orderProduct(user: User): Promise<Order> {
    try {
      const cart = await this.orderRepository.checkCartExistAndGetOrder(user);

      const countProductInCart = await this.orderDetailRepository
        .createQueryBuilder('od')
        .andWhere('od.orderId = :orderId', { orderId: cart.id })
        .getCount();

      if (countProductInCart === 0) {
        throw new BadRequestException();
      }

      /// change status order
      const currentDate = monment().format();
      cart.status = StatusOrder.WAITING;
      cart.updated_at = currentDate;

      const res = await this.orderRepository.save(cart);

      return res;
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException();
      }

      throw new InternalServerErrorException();
    }
  }

  // method DELETE
  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOne({ id });

    if (!order) {
      throw new NotFoundException();
    }

    if (order.status !== StatusOrder.WAITING) {
      throw new BadRequestException('Your order can not delete');
    }

    const resDeleteOrderDetail = await this.orderDetailRepository.delete({
      order: order,
    });

    if (resDeleteOrderDetail.affected > 0) {
      const res = await this.orderRepository.delete(order);

      return {
        statusCode: 200,
        message: 'Delete order successfully !!!',
      };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
