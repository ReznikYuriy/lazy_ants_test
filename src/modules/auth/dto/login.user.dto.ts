import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @ApiProperty({ required: true, example: 'admin@admin.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'admin' })
  @IsString()
  password: string;
}
