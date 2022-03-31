import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserPayload } from './payload-user.interface';
import { User } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'sosi-shop',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(userPayload: UserPayload): Promise<User> {
    const { id } = userPayload;

    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
