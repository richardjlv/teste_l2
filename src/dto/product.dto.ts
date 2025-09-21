import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionsDto } from './dimensions.dto';

export class ProductDto {
  @ApiProperty({
    description: 'Unique product ID',
    example: 'PS5',
  })
  @IsString()
  produto_id: string;

  @ApiProperty({
    description: 'Product dimensions',
    type: DimensionsDto,
  })
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensoes: DimensionsDto;
}