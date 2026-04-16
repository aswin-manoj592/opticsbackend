import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CashReceiptController } from './cash-receipt.controller';
import { CashReceiptService } from './cash-receipt.service';

import { CashReceipt } from './cash-receipt.entity';
import { CashReceiptItem } from './cash-receipt-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashReceipt, CashReceiptItem])
  ],
  controllers: [CashReceiptController],
  providers: [CashReceiptService],
})
export class CashReceiptModule {}
