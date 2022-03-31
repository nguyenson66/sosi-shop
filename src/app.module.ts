import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sosi-shop',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CartModule,
    ProductModule,
  ],
})
export class AppModule {}
