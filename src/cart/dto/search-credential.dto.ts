import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortProduct } from 'src/product/sort.enum';

export class KeySearchCartDto {
  @IsOptional()
  @IsString()
  order: string;

  @IsOptional()
  @IsEnum(SortProduct)
  by: SortProduct;
}
