import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  @IsNumberString()
  quantity: number;
}
