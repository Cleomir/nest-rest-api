import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async inserProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });
    const result = await newProduct.save();

    return result.id;
  }

  async getProducts() {
    const products: Product[] = await this.productModel.find().exec();
    return products;
  }

  async getSingleProduct(
    productId: string,
  ): Promise<{
    id: string;
    title: string;
    description: string;
    price: number;
  }> {
    const product = await this.findProduct(productId);

    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.findProduct(productId);
    if (!product) {
      throw new NotFoundException('Could not find the product');
    }

    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    await product.save();
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id });

    if (!result.ok || result.deletedCount === 0) {
      throw new NotFoundException('Could not find the product');
    }
  }

  async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Could not find the product');
    }

    return product;
  }
}
