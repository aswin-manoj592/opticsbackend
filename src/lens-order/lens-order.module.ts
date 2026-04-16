import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LensOrder } from './lens-order.entity';
import { LensOrderService } from './lens-order.service';
import { LensOrderController } from './lens-order.controller';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LensOrder, Stock]) // 👈 ADD Stock here
  ],
  controllers: [LensOrderController],
  providers: [LensOrderService],
})
export class LensOrderModule {}
