import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Your password so weak !!!',
  })
  password: string;
}
