import { IsEnum, IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/auth.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusOrder } from './enum/order-status.enum';
import { PaymentInfo } from './enum/payment-info.enum';
import { OrderDetail } from './order-detail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEnum(PaymentInfo)
  payment_info: string;

  @Column()
  @IsEnum(StatusOrder)
  status: string;

  @Column({ type: 'timestamptz' })
  created_at: string;

  @Column({ type: 'timestamptz' })
  updated_at: string;

  @ManyToOne((_type) => User, (user) => user.order, { eager: false })
  user: User;

  @OneToMany((_type) => OrderDetail, (orderDetail) => orderDetail.order, {
    eager: false,
  })
  orderDetail: OrderDetail[];
}
