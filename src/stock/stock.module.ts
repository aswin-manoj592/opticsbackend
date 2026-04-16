import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { DamageModule } from './damage/damage.module';
import { StockAdjustmentModule } from './stock-adjustment/stock-adjustment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), DamageModule, StockAdjustmentModule],
  providers: [StockService],
  controllers: [StockController],
  exports: [TypeOrmModule], // 👈 important
})
export class StockModule {}
