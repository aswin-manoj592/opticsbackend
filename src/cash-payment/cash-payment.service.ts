import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CashPayment } from './entities/cash-payment.entity';
import { CashPaymentItem } from './entities/cash-payment-item.entity';

@Injectable()
export class CashPaymentService {
  constructor(
    @InjectRepository(CashPayment)
    private readonly cashPaymentRepo: Repository<CashPayment>,
    private dataSource: DataSource
  ) {}

  async create(data: any, branchId?: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const payment = this.cashPaymentRepo.create({
        paymentNo: data.paymentNo,
        refNo: data.refNo,
        branchId: branchId || undefined,
        date: data.date,
        creditorAccountId: data.creditorAccountId,
        totalAmount: data.totalAmount,
      });

      const savedPayment = await queryRunner.manager.save(payment);

      if (data.items && data.items.length > 0) {
        const itemsToSave = data.items.map((item: any) => {
          return queryRunner.manager.create(CashPaymentItem, {
            ...item,
            cashPaymentId: savedPayment.id,
          });
        });
        await queryRunner.manager.save(itemsToSave);
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedPayment.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(branchId?: number) {
    const where = branchId ? { branchId } : {};
    return await this.cashPaymentRepo.find({
      where,
      relations: ['items', 'creditorAccount', 'items.debtorAccount'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number, branchId?: number) {
    const where: any = { id };
    if (branchId) where.branchId = branchId;
    const payment = await this.cashPaymentRepo.findOne({
      where,
      relations: ['items', 'creditorAccount', 'items.debtorAccount']
    });
    if (!payment) throw new NotFoundException('Cash Payment not found');
    return payment;
  }

  async remove(id: number, branchId?: number) {
    const payment = await this.findOne(id, branchId);
    return await this.cashPaymentRepo.remove(payment);
  }
}
