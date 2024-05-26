import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create.product.dto';
import { IsInt } from 'class-validator';

export class OutputProductDto extends CreateProductDto {
  @ApiProperty({
    type: 'number',
  })
  @IsInt()
  id: number;
}
