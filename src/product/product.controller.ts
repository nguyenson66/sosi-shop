import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { ProductDto } from './dto/product.dto';
import { ResultStatus } from './dto/result-status.dto';
import { SearchCredentialDto } from './dto/search-credential.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  getAllProduct(
    @Query() searchCredentialDto: SearchCredentialDto,
  ): Promise<Product[]> {
    return this.productService.getAllProduct(searchCredentialDto);
  }

  @Get('/:id')
  getProductById(@Param() id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  /////////// Just Admin //////////////

  @UseGuards(AuthGuard())
  @Post('/add')
  addProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.addProduct(productDto);
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  updateProduct(
    @Body() productDto: ProductDto,
    @Param() id: string,
  ): Promise<Product> {
    return this.productService.updateProduct(id, productDto);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteProduct(@Param() id: string): Promise<ResultStatus> {
    return this.productService.deleteProduct(id);
  }
}
