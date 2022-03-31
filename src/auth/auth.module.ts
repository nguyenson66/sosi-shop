import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from './auth.repository';
import { UserService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'sosi-shop',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
