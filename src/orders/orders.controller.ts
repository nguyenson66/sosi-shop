import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { AddProductToCartDto } from './dto/add-product-cart.dto';
import { OrderDetail } from './order-detail.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  addProductToCart(
    @getUser() user: User,
    @Body() addProductToCartDto: AddProductToCartDto,
  ): Promise<OrderDetail> {
    return this.ordersService.addProductToCart(user, addProductToCartDto);
  }

  // @Get()
  // getAllProductInCart(@getUser() user: User) {
  //   return this.ordersService.getAllProductInCart(user);
  // }
}
