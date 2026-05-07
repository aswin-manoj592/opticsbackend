import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { Stock } from '../stock/stock.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
