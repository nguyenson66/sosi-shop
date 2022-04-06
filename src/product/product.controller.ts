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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/auth/user-role.enum';
import { ProductDto } from './dto/product.dto';
import { ResultStatus } from './dto/result-status.dto';
import { SearchCredentialDto } from './dto/search-credential.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiBearerAuth()
@ApiTags('products')
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

  @Post('/add')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.Admin)
  addProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.addProduct(productDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.Admin)
  updateProduct(
    @Body() productDto: ProductDto,
    @Param() id: string,
  ): Promise<Product> {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.Admin)
  deleteProduct(@Param() id: string): Promise<ResultStatus> {
    return this.productService.deleteProduct(id);
  }
}
