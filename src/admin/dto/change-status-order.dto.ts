import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusOrder } from 'src/orders/enum/order-status.enum';

export class ChangeStatusOrderDto {
  @IsNotEmpty()
  @IsEnum(StatusOrder)
  from: StatusOrder;

  @IsNotEmpty()
  @IsEnum(StatusOrder)
  to: StatusOrder;
}
