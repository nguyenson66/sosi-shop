import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment';
import { User } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ResultStatus } from './dto/result-status.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async addProduct(productDto: ProductDto): Promise<Product> {
    const { name, description, price, quantity } = productDto;

    const currentDate = moment().format();

    try {
      const product = this.create({
        name,
        description,
        price: +price,
        quantity: +quantity,
        created_at: currentDate,
        updated_at: currentDate,
      });

      await this.save(product);

      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteProduct(id: string): Promise<ResultStatus> {
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException();
    try {
      await this.delete(product);

      const resultStatus = {
        statusCode: 200,
        message: `Delete product successfully !`,
      };

      return resultStatus;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // async getProductById(id: string): Promise<Product> {
  //   const product = await this.findOne({ id });

  //   if (!product) {
  //     throw new NotFoundException();
  //   }

  //   return product;
  // }
}
