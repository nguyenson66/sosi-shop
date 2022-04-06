import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/auth/user-role.enum';
import { GetOrderDto } from 'src/orders/dto/get-order.dto';
import { Order } from 'src/orders/orders.entity';
import { AdminService } from './admin.service';
import { ChangeStatusOrderDto } from './dto/change-status-order.dto';

@Controller('admin')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRole.Admin)
@ApiBearerAuth()
@ApiTags('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('')
  getAllOrder(@Query() getOrderDto: GetOrderDto) {
    return this.adminService.getAllOrder(getOrderDto);
  }

  @Post('/order/:id')
  changeStatusOrder(
    @Query() changeStatusOrderDto: ChangeStatusOrderDto,
    @Param('id') id: string,
  ): Promise<Order> {
    return this.adminService.changeStatusOrder(changeStatusOrderDto, id);
  }
}
