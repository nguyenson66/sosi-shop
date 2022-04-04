import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { AddProductToCartDto } from 'src/orders/dto/add-product-cart.dto';
import { OrderDetail } from 'src/orders/order-detail.entity';
import { Order } from 'src/orders/orders.entity';
import {
  OrderDetailRepository,
  OrderRepository,
} from 'src/orders/orders.repository';
import { ProductRepository } from 'src/product/product.repository';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectRepository(OrderDetailRepository)
    private orderDetailRepository: OrderDetailRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  checkCartExistAndGetOrder(user: User): Promise<Order> {
    return this.orderRepository.checkCartExistAndGetOrder(user);
  }

  async addProductToCart(
    user: User,
    addProductToCartDto: AddProductToCartDto,
  ): Promise<OrderDetail> {
    const order = await this.checkCartExistAndGetOrder(user);

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

  // get all product in cart
  async getAllProductInCart(user: User) {
    try {
      const cart = await this.orderRepository.checkCartExistAndGetOrder(user);

      const query = this.orderDetailRepository
        .createQueryBuilder('od')
        .innerJoinAndSelect('od.product', 'product')
        .andWhere(`od.order = '${cart.id}'`);

      const result = await query.getMany();

      return result;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }
}
