import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { StatusOrder } from '../enum/order-status.enum';

export class GetOrderDto {
  @IsOptional()
  @IsEnum(StatusOrder)
  statusOrder: StatusOrder;

  @IsOptional()
  @IsNotEmpty()
  order: string;

  @IsOptional()
  @IsNotEmpty()
  by: string;

  @IsOptional()
  @IsNumberString()
  limit: number;
}
