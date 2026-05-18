import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

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

  private async generateSmartBarcode(category?: string, brand?: string, model?: string): Promise<string> {
    const catPrefix = (category && category.length >= 3 ? category.substring(0, 3) : 'GEN').toUpperCase();
    
    let secondPrefix = 'GEN';
    if (brand && brand.length >= 3) {
      secondPrefix = brand.substring(0, 3).toUpperCase();
    } else if (model && model.length >= 3) {
      secondPrefix = model.substring(0, 3).toUpperCase();
    } else if (brand) {
      secondPrefix = brand.toUpperCase().padEnd(3, 'X');
    }

    const basePrefix = `${catPrefix}-${secondPrefix}-`;

    const lastProduct = await this.repo.findOne({
      where: { barcode: Like(`${basePrefix}%`) },
      order: { id: 'DESC' },
    });

    let nextSeq = 1;
    if (lastProduct && lastProduct.barcode) {
      const parts = lastProduct.barcode.split('-');
      if (parts.length === 3) {
        const lastSeq = parseInt(parts[2], 10);
        if (!isNaN(lastSeq)) {
          nextSeq = lastSeq + 1;
        }
      }
    }

    const paddedSeq = nextSeq.toString().padStart(4, '0');
    return `${basePrefix}${paddedSeq}`;
  }

  async create(dto: CreateProductDto, branchId?: number) {
    if (!dto.barcode || dto.barcode.trim() === '') {
      dto.barcode = await this.generateSmartBarcode(dto.category, dto.brand, dto.model);
    }
    
    // Override frontend dummy code if it's the default "P12345" style
    if (!dto.code || dto.code.trim() === '' || /^P\d+$/.test(dto.code)) {
      dto.code = dto.barcode;
    }

    const data = this.repo.create(dto);
    const savedProduct = await this.repo.save(data);

    if (dto.initialStock && Number(dto.initialStock) > 0) {
      const stock = this.stockRepo.create({
        product: savedProduct,
        quantity: Number(dto.initialStock),
        vendor: 'Opening Stock',
        branchId: branchId || undefined,
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
