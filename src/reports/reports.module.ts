import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '../sales/sales.entity';
import { CashReceipt } from '../cash-receipt/cash-receipt.entity';
import { SalesOrder } from '../sales-order/entities/sales-order.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, CashReceipt, SalesOrder])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
