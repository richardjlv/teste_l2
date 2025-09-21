import { ApiProperty } from '@nestjs/swagger';

export class BoxResultDto {
  @ApiProperty({
    description: 'ID of the box used or null if the product does not fit',
    example: 'Caixa 1',
    nullable: true,
  })
  caixa_id: string | null;

  @ApiProperty({
    description: 'List of product IDs in this box',
    example: ['PS5', 'Volante'],
  })
  produtos: string[];

  @ApiProperty({
    description: 'Observation when product does not fit in any box',
    example: 'Produto não cabe em nenhuma caixa disponível.',
    required: false,
  })
  observacao?: string;
}

export class OrderResultDto {
  @ApiProperty({
    description: 'ID of the processed order',
    example: 1,
  })
  pedido_id: number;

  @ApiProperty({
    description: 'List of boxes used for this order',
    type: [BoxResultDto],
  })
  caixas: BoxResultDto[];
}

export class PackingOutputDto {
  @ApiProperty({
    description: 'List of processed orders with their boxes',
    type: [OrderResultDto],
  })
  pedidos: OrderResultDto[];
}