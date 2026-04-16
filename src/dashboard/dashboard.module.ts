import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Sale } from '../sales/sales.entity';
import { Customer } from '../customers/customer.entity';
import { Stock } from '../stock/stock.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Customer, Stock, Product])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
