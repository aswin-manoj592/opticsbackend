import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockAdjustment } from './stock-adjustment.entity';
import { StockAdjustmentService } from './stock-adjustment.service';
import { StockAdjustmentController } from './stock-adjustment.controller';
import { Stock } from '../stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockAdjustment, Stock])],
  providers: [StockAdjustmentService],
  controllers: [StockAdjustmentController],
})
export class StockAdjustmentModule { }
