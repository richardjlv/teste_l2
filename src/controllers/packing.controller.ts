import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PackingService } from '../services/packing.service';
import { PackingInputDto } from '../dto/packing-input.dto';
import { PackingOutputDto } from '../dto/packing-output.dto';

@ApiTags('empacotamento')
@Controller('empacotamento')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Process order packing',
    description: 'Receives a list of orders with products and their dimensions, and returns the best way to pack them in available boxes.',
  })
  @ApiBody({
    type: PackingInputDto,
    description: 'List of orders to process',
    examples: {
      example1: {
        summary: 'Example with 2 orders',
        value: {
          pedidos: [
            {
              pedido_id: 1,
              produtos: [
                {
                  produto_id: 'PS5',
                  dimensoes: {
                    altura: 40,
                    largura: 10,
                    comprimento: 25,
                  },
                },
                {
                  produto_id: 'Volante',
                  dimensoes: {
                    altura: 40,
                    largura: 30,
                    comprimento: 30,
                  },
                },
              ],
            },
            {
              pedido_id: 2,
              produtos: [
                {
                  produto_id: 'Joystick',
                  dimensoes: {
                    altura: 15,
                    largura: 20,
                    comprimento: 10,
                  },
                },
              ],
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Packing processed successfully',
    type: PackingOutputDto,
    examples: {
      example1: {
        summary: 'Packing result',
        value: {
          pedidos: [
            {
              pedido_id: 1,
              caixas: [
                {
                  caixa_id: 'Caixa 2',
                  produtos: ['PS5', 'Volante'],
                },
              ],
            },
            {
              pedido_id: 2,
              caixas: [
                {
                  caixa_id: 'Caixa 1',
                  produtos: ['Joystick'],
                },
              ],
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  process(
    @Body() input: PackingInputDto,
  ): PackingOutputDto {
    return this.packingService.process(input);
  }
}