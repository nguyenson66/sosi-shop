import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async addProduct(productDto: ProductDto): Promise<Product> {
    const { name, description, price, quantity } = productDto;

    try {
      const product = this.create({
        name,
        description,
        price: +price,
        quantity: +quantity,
      });

      await this.save(product);

      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
