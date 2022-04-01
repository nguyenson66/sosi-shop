import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { User } from 'src/auth/auth.entity';
import { ProductDto } from './dto/product.dto';
import { ResultStatus } from './dto/result-status.dto';
import { SearchCredentialDto } from './dto/search-credential.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllProduct(
    searchCredentialDto: SearchCredentialDto,
  ): Promise<Product[]> {
    const { s, order, by } = searchCredentialDto;

    const query = this.productRepository.createQueryBuilder('product');

    if (s) {
      query.andWhere(
        'product.name LIKE :key or product.description LIKE :key',
        { key: `%${s}%` },
      );
    }

    if (order) {
      if (by === 'DESC') query.orderBy(`product.${order}`, 'DESC');
      else query.orderBy(`product.${order}`);
    }

    const result = await query.getMany();

    return result;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    return product;
  }

  //////// Just Admin ////////
  addProduct(productDto: ProductDto): Promise<Product> {
    return this.productRepository.addProduct(productDto);
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<Product> {
    const { name, description, price, quantity } = productDto;

    const currentDate = moment().format();

    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product ID : ${id} Not Found`);
    }

    product.name = name;
    product.description = description;
    product.price = +price;
    product.quantity = +quantity;
    product.updated_at = currentDate;

    const result = this.productRepository.save(product);
    console.log(result);

    return product;
  }

  deleteProduct(id: string): Promise<ResultStatus> {
    return this.productRepository.deleteProduct(id);
  }
}
