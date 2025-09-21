import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDto } from './product.dto';

export class OrderInputDto {
  @ApiProperty({
    description: 'Unique order ID',
    example: 1,
  })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({
    description: 'List of products in the order',
    type: [ProductDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  produtos: ProductDto[];
}

export class PackingInputDto {
  @ApiProperty({
    description: 'List of orders to process',
    type: [OrderInputDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderInputDto)
  pedidos: OrderInputDto[];
}