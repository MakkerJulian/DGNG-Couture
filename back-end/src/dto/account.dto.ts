import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsIn(['sales', 'research'])
  role: string;
}

export class LoginDto {
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  password: string;
}
