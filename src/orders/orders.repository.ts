import { InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';
import { User } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { StatusOrder } from './enum/order-status.enum';
import { PaymentInfo } from './enum/payment-info.enum';
import { OrderDetail } from './order-detail.entity';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async checkCartExistAndGetOrder(user: User): Promise<Order> {
    try {
      const query = this.createQueryBuilder('order');
      query.andWhere(`order.status = 'CART' and order.userId = :userId`, {
        userId: user.id,
      });

      const result = await query.getOne();

      // if user dont have order status is CART, server will create a Order status = CART
      if (!result) {
        const currentDate = moment().format();

        const order = this.create({
          payment_info: PaymentInfo.CASH,
          status: StatusOrder.CART,
          user,
          created_at: currentDate,
          updated_at: currentDate,
        });

        const res = await this.save(order);

        return res;
      }

      return result;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
}

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail> {}
