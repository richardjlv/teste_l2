import { Box } from './box.model';

export interface Dimensions {
  altura: number;
  largura: number;
  comprimento: number;
}

export class Product {
  constructor(
    public id: string,
    public dimensions: Dimensions,
  ) {}

  getVolume(): number {
    return this.dimensions.altura * this.dimensions.largura * this.dimensions.comprimento;
  }

  fitsInBox(box: Box): boolean {
    const productDims = [this.dimensions.altura, this.dimensions.largura, this.dimensions.comprimento].sort((a, b) => a - b);
    const boxDims = [box.dimensions.altura, box.dimensions.largura, box.dimensions.comprimento].sort((a, b) => a - b);
    
    return productDims[0] <= boxDims[0] && 
           productDims[1] <= boxDims[1] && 
           productDims[2] <= boxDims[2];
  }
}