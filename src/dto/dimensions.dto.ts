import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class DimensionsDto {
  @ApiProperty({
    description: 'Product height in centimeters',
    example: 40,
  })
  @IsNumber()
  @IsPositive()
  altura: number;

  @ApiProperty({
    description: 'Product width in centimeters',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  largura: number;

  @ApiProperty({
    description: 'Product length in centimeters',
    example: 25,
  })
  @IsNumber()
  @IsPositive()
  comprimento: number;
}