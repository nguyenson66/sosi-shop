import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortProduct } from '../sort.enum';

export class SearchCredentialDto {
  @IsOptional()
  @IsString()
  s: string;

  @IsOptional()
  @IsEnum(SortProduct)
  by: string;

  @IsOptional()
  @IsString()
  order: string;
}
