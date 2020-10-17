import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  inserProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);

    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const { product } = this.findProduct(productId);

    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const { product, productIndex } = this.findProduct(productId);
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.desc = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[productIndex] = updatedProduct;
  }

  private findProduct(id: string): { product: Product; productIndex: number } {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find the product');
    }

    return {
      product,
      productIndex,
    };
  }
}
