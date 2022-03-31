import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
