import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetOrderDto } from 'src/orders/dto/get-order.dto';
import { StatusOrder } from 'src/orders/enum/order-status.enum';
import { Order } from 'src/orders/orders.entity';
import {
  OrderDetailRepository,
  OrderRepository,
} from 'src/orders/orders.repository';
import { ProductRepository } from 'src/product/product.repository';
import { SortProduct } from 'src/product/sort.enum';
import { ChangeStatusOrderDto } from './dto/change-status-order.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,

    @InjectRepository(OrderDetailRepository)
    private orderDetailRepository: OrderDetailRepository,

    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllOrder(getOrderDto: GetOrderDto) {
    const { statusOrder, order, by, limit } = getOrderDto;

    const query = this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.user', 'user')
      .innerJoinAndSelect('order.orderDetail', 'order_detail')
      .innerJoinAndSelect('order_detail.product', 'product')
      .select([
        'order.id',
        'order.payment_info',
        'order.status',
        'user.name',
        'user.phone',
        'user.email',
        'order_detail.quantity',
        'product.id',
        'product.name',
        'product.quantity',
        'product.price',
      ]);

    if (
      statusOrder &&
      statusOrder != StatusOrder.CART &&
      statusOrder != StatusOrder.CLOSE
    ) {
      query.andWhere('order.status = :statusOrder', { statusOrder });
    } else {
      query.andWhere(
        'order.status != :statusCart and order.status != :statusClose',
        { statusCart: StatusOrder.CART, statusClose: StatusOrder.CLOSE },
      );
    }

    if (by) {
      if (order === SortProduct.DESC) {
        query.orderBy(by, order);
      } else {
        query.orderBy(by, 'ASC');
      }
    }

    if (limit) {
      query.limit(+limit);
    }

    let res = await query.getMany();

    // cal cost order
    for (let i = 0; i < res.length; i++) {
      let cost = 0;

      const orderDetail = res[i].orderDetail;

      for (let j = 0; j < orderDetail.length; j++) {
        cost += orderDetail[j].quantity * orderDetail[j].product.price;
      }

      const sav = {
        ...res[i],
        cost,
      };

      res[i] = sav;
    }

    return res;
  }

  async changeStatusOrder(
    changeStatusOrderDto: ChangeStatusOrderDto,
    id: string,
  ): Promise<Order> {
    const { from, to } = changeStatusOrderDto;

    try {
      const order = await this.orderRepository.findOne({ id, status: from });

      if (!order) {
        throw new NotFoundException();
      }

      order.status = to;

      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      if (error.status === 404) throw new NotFoundException();

      throw new InternalServerErrorException();
    }
  }
}
