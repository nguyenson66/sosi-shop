import { Exclude } from 'class-transformer';
import { IsEmail, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';
import { Order } from 'src/orders/orders.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  @MinLength(10)
  @MaxLength(40)
  email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    unique: true,
  })
  @MinLength(6)
  @MaxLength(30)
  phone: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  @MinLength(6)
  @MaxLength(40)
  name: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  @MinLength(10)
  password: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany((_type) => Order, (order) => order.user, { eager: false })
  order: Order[];
}
