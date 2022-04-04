import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { AddProductToCartDto } from 'src/orders/dto/add-product-cart.dto';
import { OrderDetail } from 'src/orders/order-detail.entity';
import { CartService } from './cart.service';

@UseGuards(AuthGuard())
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addProductToCart(
    @getUser() user: User,
    @Body() addProductToCartDto: AddProductToCartDto,
  ): Promise<OrderDetail> {
    return this.cartService.addProductToCart(user, addProductToCartDto);
  }

  @Get()
  getAllProductInCart(@getUser() user: User) {
    return this.cartService.getAllProductInCart(user);
  }
}
