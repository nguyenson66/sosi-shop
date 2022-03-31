import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  quantity: number;
}
