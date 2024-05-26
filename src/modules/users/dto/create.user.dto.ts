import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesEnum } from '../enums/user.role';

export default class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'admin@admin.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  name?: string;

  @IsEnum(RolesEnum)
  @ApiProperty({
    example: `${Object.values(RolesEnum)}`,
    required: false,
  })
  role?: RolesEnum;

  @IsString()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsOptional()
  password: string;
}
