import { OrderDetail } from 'src/orders/order-detail.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'float',
  })
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamptz' })
  created_at: string;

  @Column({ type: 'timestamptz' })
  updated_at: string;

  @OneToMany((_type) => OrderDetail, (orderDetail) => orderDetail.product, {
    eager: false,
  })
  orderDetail: OrderDetail[];
}
