import { Dimensions } from './product.model';

export class Box {
  constructor(
    public id: string,
    public dimensions: Dimensions,
  ) {}

  getVolume(): number {
    return this.dimensions.altura * this.dimensions.largura * this.dimensions.comprimento;
  }
}

export const AVAILABLE_BOXES: Box[] = [
  new Box('Caixa 1', { altura: 30, largura: 40, comprimento: 80 }),
  new Box('Caixa 2', { altura: 50, largura: 50, comprimento: 40 }),
  new Box('Caixa 3', { altura: 50, largura: 80, comprimento: 60 }),
];