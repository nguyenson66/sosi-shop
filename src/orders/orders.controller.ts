import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/auth/user-role.enum';
import { GetOrderDto } from './dto/get-order.dto';
import { StatusOrder } from './enum/order-status.enum';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('order')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('order')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  /// method GET
  @Get()
  getListOrder(
    @getUser() user: User,
    @Query() getOrderDto: GetOrderDto,
  ): Promise<Order[]> {
    return this.ordersService.getListOrder(user, getOrderDto);
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
