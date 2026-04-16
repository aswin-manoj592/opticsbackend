import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CashReceipt } from './cash-receipt.entity';
import { CashReceiptItem } from './cash-receipt-item.entity';

@Injectable()
export class CashReceiptService {

  constructor(

    @InjectRepository(CashReceipt)
    private receiptRepo: Repository<CashReceipt>,

    @InjectRepository(CashReceiptItem)
    private itemRepo: Repository<CashReceiptItem>,

  ) {}

  /* GET ALL */

  findAll(branchId?: number) {
    const where = branchId ? { branchId } : {};
    return this.receiptRepo.find({ where });
  }

  /* CREATE RECEIPT */

  async create(data: any, branchId?: number) {

    const receipt = await this.receiptRepo.save({
      receiptNo: data.receiptNo,
      refNo: data.refNo,
      branchId: branchId || undefined,
      date: data.date,
      total: data.total
    });

    for (const item of data.items) {

      await this.itemRepo.save({
        receiptId: receipt.id,
        customerId: item.customerId,
        description: item.description,
        amount: item.amount,
        discount: item.discount,
        net: item.net
      });

    }

    return {
      message: "Cash Receipt Saved",
      id: receipt.id
    };

  }

}
