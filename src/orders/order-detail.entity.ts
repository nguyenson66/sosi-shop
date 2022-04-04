import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  quantity: number;

  @ManyToOne((_type) => Order, (order) => order.orderDetail, { eager: false })
  @JoinTable()
  order: Order;

  @ManyToOne((_type) => Product, (product) => product.orderDetail, {
    eager: false,
  })
  @JoinColumn()
  product: Product;
}
