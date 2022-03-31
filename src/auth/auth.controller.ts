import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.registerUser(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.userService.loginUser(loginDto);
  }
}
