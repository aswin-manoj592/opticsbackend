import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesReturnController } from './sales-return.controller';
import { SalesReturnService } from './sales-return.service';

import { SalesReturn } from './entities/sales-return.entity';
import { SalesReturnItem } from './entities/sales-return-item.entity';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesReturn, SalesReturnItem, Stock])],
  controllers: [SalesReturnController],
  providers: [SalesReturnService],
})
export class SalesReturnModule {}
