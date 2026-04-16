import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

import { Sale } from './sales.entity';
import { SaleItem } from './sale-item.entity';
import { Product } from '../product/product.entity';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem, Product, Stock])
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }
