import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    type: 'number',
  })
  @IsNumber()
  price?: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  category?: string;
}
