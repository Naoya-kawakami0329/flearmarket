import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsStrongPassword,
} from 'class-validator';
import { UserStatus } from 'generated/prisma';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
