import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { Stock } from '../stock/stock.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepo: Repository<Stock>,
  ) { }

  async create(dto: CreateProductDto) {
    const data = this.repo.create(dto);
    const savedProduct = await this.repo.save(data);

    if (dto.initialStock && Number(dto.initialStock) > 0) {
      const stock = this.stockRepo.create({
        product: savedProduct,
        quantity: Number(dto.initialStock),
        vendor: 'Opening Stock',
      });
      await this.stockRepo.save(stock);
    }

    return savedProduct;
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, dto: UpdateProductDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id }
    });
  }



  async incrementLikes(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (product) {
      product.likes = (product.likes || 0) + 1;
      return this.repo.save(product);
    }
    return null;
  }

  async findByBarcode(barcode: string) {
    return this.repo.findOne({
      where: { barcode }
    });
  }
}
