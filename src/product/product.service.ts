import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  // getAllProduct()

  addProduct(productDto: ProductDto): Promise<Product> {
    return this.productRepository.addProduct(productDto);
  }
}
