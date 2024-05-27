import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  category: string;
}
