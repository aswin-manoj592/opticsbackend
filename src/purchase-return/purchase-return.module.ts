import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseReturn } from './purchase-return.entity';
import { PurchaseReturnItem } from './purchase-return-item.entity';
import { PurchaseReturnService } from './purchase-return.service';
import { PurchaseReturnController } from './purchase-return.controller';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseReturn,
      PurchaseReturnItem,
      Stock
    ])
  ],
  providers: [PurchaseReturnService],
  controllers: [PurchaseReturnController],
})
export class PurchaseReturnModule {}   // ✅ VERY IMPORTANT
