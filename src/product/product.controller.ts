import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // @Get('')
  // getAllProduct():Promise<Product[]>{

  // }

  @Post('/add')
  addProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.addProduct(productDto);
  }
}
