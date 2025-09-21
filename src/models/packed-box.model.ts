import { Product, Dimensions } from './product.model';
import { Box } from './box.model';

interface Position3D {
  x: number;
  y: number;
  z: number;
  largura: number;
  altura: number;
  comprimento: number;
}

export class PackedBox {
  private occupiedPositions: Position3D[] = [];

  constructor(
    public box: Box,
    public products: Product[] = [],
  ) {}

  addProduct(product: Product): boolean {
    const position = this.findAvailablePosition(product);
    if (position) {
      this.products.push(product);
      this.occupiedPositions.push(position);
      return true;
    }
    return false;
  }

  private findAvailablePosition(product: Product): Position3D | null {
    if (!product.fitsInBox(this.box)) {
      return null;
    }

    const orientations = this.generateProductOrientations(product.dimensions);

    for (const orientation of orientations) {
      for (let x = 0; x <= this.box.dimensions.largura - orientation.largura; x++) {
        for (let y = 0; y <= this.box.dimensions.altura - orientation.altura; y++) {
          for (let z = 0; z <= this.box.dimensions.comprimento - orientation.comprimento; z++) {
            const newPosition: Position3D = {
              x,
              y,
              z,
              largura: orientation.largura,
              altura: orientation.altura,
              comprimento: orientation.comprimento,
            };

            if (!this.hasCollision(newPosition)) {
              return newPosition;
            }
          }
        }
      }
    }

    return null;
  }

  private generateProductOrientations(dimensions: Dimensions): Dimensions[] {
    const { altura, largura, comprimento } = dimensions;
    
    return [
      { altura, largura, comprimento },
      { altura: largura, largura: altura, comprimento },
      { altura: comprimento, largura, comprimento: altura },
      { altura, largura: comprimento, comprimento: largura },
      { altura: largura, largura: comprimento, comprimento: altura },
      { altura: comprimento, largura: altura, comprimento: largura },
    ];
  }

  private hasCollision(newPosition: Position3D): boolean {
    for (const existingPosition of this.occupiedPositions) {
      if (this.positionsOverlap(newPosition, existingPosition)) {
        return true;
      }
    }
    return false;
  }

  private positionsOverlap(pos1: Position3D, pos2: Position3D): boolean {
    return !(
      pos1.x + pos1.largura <= pos2.x ||
      pos2.x + pos2.largura <= pos1.x ||
      pos1.y + pos1.altura <= pos2.y ||
      pos2.y + pos2.altura <= pos1.y ||
      pos1.z + pos1.comprimento <= pos2.z ||
      pos2.z + pos2.comprimento <= pos1.z
    );
  }

  getUtilization(): number {
    const occupiedVolume = this.products.reduce((total, p) => total + p.getVolume(), 0);
    return (occupiedVolume / this.box.getVolume()) * 100;
  }

  getRemainingSpace(): number {
    const occupiedVolume = this.products.reduce((total, p) => total + p.getVolume(), 0);
    return this.box.getVolume() - occupiedVolume;
  }
}