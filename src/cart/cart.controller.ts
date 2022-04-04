import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { OrderDetail } from 'src/orders/order-detail.entity';
import { CartService } from './cart.service';
import { KeySearchCartDto } from './dto/search-credential.dto';

@UseGuards(AuthGuard())
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  ///// GET /////
  @Get()
  getAllProductInCart(
    @getUser() user: User,
    @Query() keySearchCartDto: KeySearchCartDto,
  ): Promise<OrderDetail[]> {
    return this.cartService.getAllProductInCart(user, keySearchCartDto);
  }

  ///// POST /////
  @Post('/:id')
  addProductToCart(
    @getUser() user: User,
    @Body('quantity') quantity: number,
    @Param('id') id: string,
  ): Promise<OrderDetail> {
    return this.cartService.addProductToCart(user, quantity, id);
  }

  ///// DELETE /////
  @Delete('/:id')
  deleteProductInCart(@getUser() user: User, @Param('id') id: string) {
    return this.cartService.deleteProductFromCart(user, id);
  }

  ///// PATCH /////
  @Patch('/:id')
  changeQuantityProduct(
    @getUser() user: User,
    @Param('id') id: string,
    @Body('quantity') newQuantity: number,
  ): Promise<OrderDetail> {
    return this.cartService.changeQuantityProduct(user, newQuantity, id);
  }
}
