import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('order')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  /// method GET
  @Get()
  getListOrder(@getUser() user: User): Promise<Order[]> {
    return this.ordersService.getListOrder(user);
  }

  @Get('/:id')
  getOrderById(@getUser() user: User, @Param('id') id: string) {
    return this.ordersService.getOrderById(user, id);
  }

  /// method POST
  @Post()
  orderProduct(@getUser() user: User): Promise<Order> {
    return this.ordersService.orderProduct(user);
  }

  // method DELETE
  @Delete('/:id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
