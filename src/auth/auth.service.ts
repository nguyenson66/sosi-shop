import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { UserRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './payload-user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  registerUser(registerDto: RegisterDto): Promise<User> {
    return this.userRepository.registerUser(registerDto);
  }

  async loginUser(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, phone, password } = loginDto;

    if (!email && !phone) {
      throw new UnauthorizedException();
    }

    try {
      if (email) {
        const user = await this.userRepository.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          const userPayload: UserPayload = { id: user.id };

          const accessToken = this.jwtService.sign(userPayload);

          return { accessToken };
        } else {
          throw new UnauthorizedException();
        }
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // const userPayload: UserPayload = { id: user.id };

      // const accessToken = this.jwtService.sign(userPayload);

      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
