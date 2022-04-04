import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { OrderDetail } from 'src/orders/order-detail.entity';
import { Order } from 'src/orders/orders.entity';
import {
  OrderDetailRepository,
  OrderRepository,
} from 'src/orders/orders.repository';
import { ProductRepository } from 'src/product/product.repository';
import { SortProduct } from 'src/product/sort.enum';
import { KeySearchCartDto } from './dto/search-credential.dto';

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

  /// method POST add product to cart
  async addProductToCart(
    user: User,
    quantity: number,
    id: string,
  ): Promise<OrderDetail> {
    const order = await this.checkCartExistAndGetOrder(user);

    try {
      const product = await this.productRepository.findOne({ id });

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
      console.log(error);

      throw new NotFoundException(`Product ID ${id} not found`);
    }
  }

  // method POST change quantity product in cart
  async changeQuantityProduct(
    user: User,
    newQuantity: number,
    id: string,
  ): Promise<OrderDetail> {
    const cart = await this.checkCartExistAndGetOrder(user);

    if (!cart) {
      throw new InternalServerErrorException();
    }

    const productInCart: OrderDetail = await this.orderDetailRepository
      .createQueryBuilder('od')
      .andWhere('od.order = :order', { order: cart.id })
      .andWhere('od.id = :id', { id })
      .getOne();

    if (!productInCart) {
      throw new NotFoundException();
    }

    productInCart.quantity = newQuantity;

    const res = await this.orderDetailRepository.save(productInCart);

    return res;
  }

  // get all product in cart
  async getAllProductInCart(
    user: User,
    keySearchCartDto: KeySearchCartDto,
  ): Promise<OrderDetail[]> {
    const { order, by } = keySearchCartDto;

    try {
      const cart = await this.orderRepository.checkCartExistAndGetOrder(user);

      const query = this.orderDetailRepository
        .createQueryBuilder('od')
        .innerJoinAndSelect('od.product', 'product')
        .andWhere(`od.order = '${cart.id}'`);

      /// search
      if (order === 'name') {
        if (!by) query.orderBy(`product.name`, 'ASC');
        else query.orderBy(`product.name`, by);
      } else if (order === 'quantity') {
        if (!by) query.orderBy(`od.quantity`, 'ASC');
        else query.orderBy(`od.quantity`, by);
      }

      const result = await query.getMany();

      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  /// method DELETE delete product from cart
  async deleteProductFromCart(user: User, id: string) {
    const cart = await this.orderRepository.checkCartExistAndGetOrder(user);

    if (!cart) {
      throw new InternalServerErrorException();
    }

    const productInCart = await this.orderDetailRepository
      .createQueryBuilder('od')
      .andWhere('od.order = :order', { order: cart.id })
      .andWhere('od.id = :id', { id })
      .getOne();

    if (!productInCart) {
      throw new NotFoundException();
    } else {
      const res = await this.orderDetailRepository.delete(productInCart);

      return {
        statusCode: 200,
        message: 'delete product successfully !',
      };
    }
  }
}
