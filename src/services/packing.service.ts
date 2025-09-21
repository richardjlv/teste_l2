import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { Box, AVAILABLE_BOXES } from '../models/box.model';
import { PackedBox } from '../models/packed-box.model';
import { PackingInputDto, OrderInputDto } from '../dto/packing-input.dto';
import { PackingOutputDto, OrderResultDto, BoxResultDto } from '../dto/packing-output.dto';

@Injectable()
export class PackingService {
  
  process(input: PackingInputDto): PackingOutputDto {
    const processedOrders = input.pedidos.map(order => this.processOrder(order));
    
    return {
      pedidos: processedOrders,
    };
  }

  private processOrder(orderInput: OrderInputDto): OrderResultDto {
    const products = orderInput.produtos.map(p => 
      new Product(p.produto_id, p.dimensoes)
    );

    products.sort((a, b) => {
      const maxDimensionA = Math.max(a.dimensions.altura, a.dimensions.largura, a.dimensions.comprimento);
      const maxDimensionB = Math.max(b.dimensions.altura, b.dimensions.largura, b.dimensions.comprimento);
      
      if (maxDimensionA !== maxDimensionB) {
        return maxDimensionB - maxDimensionA;
      }
      
      return b.getVolume() - a.getVolume();
    });

    const usedBoxes: PackedBox[] = [];
    const unpackedProducts: Product[] = [];

    for (const product of products) {
      let packed = false;

      usedBoxes.sort((a, b) => a.getRemainingSpace() - b.getRemainingSpace());

      for (const packedBox of usedBoxes) {
        if (packedBox.addProduct(product)) {
          packed = true;
          break;
        }
      }

      if (!packed) {
        const newBox = this.findSmallestFittingBox(product);
        if (newBox) {
          const packedBox = new PackedBox(newBox);
          if (packedBox.addProduct(product)) {
            usedBoxes.push(packedBox);
            packed = true;
          }
        }
      }

      if (!packed) {
        unpackedProducts.push(product);
      }
    }

    const boxResults: BoxResultDto[] = [];

    usedBoxes.forEach(packedBox => {
      boxResults.push({
        caixa_id: packedBox.box.id,
        produtos: packedBox.products.map(p => p.id),
      });
    });

    unpackedProducts.forEach(product => {
      boxResults.push({
        caixa_id: null,
        produtos: [product.id],
        observacao: 'Produto não cabe em nenhuma caixa disponível.',
      });
    });

    return {
      pedido_id: orderInput.pedido_id,
      caixas: boxResults,
    };
  }

  private findSmallestFittingBox(product: Product): Box | null {
    const compatibleBoxes = AVAILABLE_BOXES
      .filter(box => product.fitsInBox(box))
      .map(box => ({
        box,
        efficiency: this.calculatePackingEfficiency(product, box)
      }))
      .sort((a, b) => b.efficiency - a.efficiency);

    return compatibleBoxes.length > 0 ? compatibleBoxes[0].box : null;
  }

  private calculatePackingEfficiency(product: Product, box: Box): number {
    const productVolume = product.getVolume();
    const boxVolume = box.getVolume();
    return productVolume / boxVolume;
  }
}