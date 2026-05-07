import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { SalesReturn } from './entities/sales-return.entity';
import { SalesReturnItem } from './entities/sales-return-item.entity';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class SalesReturnService {
    constructor(
        @InjectRepository(SalesReturn)
        private returnRepo: Repository<SalesReturn>,

        @InjectRepository(SalesReturnItem)
        private returnItemRepo: Repository<SalesReturnItem>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,

        private dataSource: DataSource
    ) { }

    async findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.returnRepo.find({
            where,
            relations: { customer: true, items: { product: true }, sale: true }
        });
    }

    async findOne(id: number, branchId?: number) {
        const where: any = { id };
        if (branchId) where.branchId = branchId;
        return this.returnRepo.findOne({
            where,
            relations: { customer: true, items: { product: true }, sale: true }
        });
    }

    async create(data: any, branchId?: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const salesReturn = queryRunner.manager.create(SalesReturn, {
                customerId: data.customerId,
                saleId: data.saleId,
                branchId: branchId || undefined,
                date: new Date(data.date),
                total: data.total,
                reason: data.reason || '',
                returnNo: data.returnNo || `SR-${Date.now().toString().slice(-6)}`,
                voucherType: data.voucherType || 'SR'
            });

            const savedReturn = await queryRunner.manager.save(SalesReturn, salesReturn);

            if (data.items && data.items.length) {
                const returnItems = data.items.map((item: any) => 
                    queryRunner.manager.create(SalesReturnItem, {
                        salesReturnId: savedReturn.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        rate: item.rate,
                        amount: item.amount
                    })
                );

                await queryRunner.manager.save(SalesReturnItem, returnItems);

                // Increase Stock
                for (const item of returnItems) {
                    const stockWhere: any = { productId: item.productId }
                    if (branchId) stockWhere.branchId = branchId;
                    const stock = await queryRunner.manager.findOne(Stock, {
                        where: stockWhere
                    });

                    if (stock) {
                        stock.quantity += Number(item.quantity);
                        await queryRunner.manager.save(Stock, stock);
                    } else {
                        const newStock = queryRunner.manager.create(Stock, {
                            productId: item.productId,
                            branchId: branchId || undefined,
                            quantity: Number(item.quantity)
                        });
                        await queryRunner.manager.save(Stock, newStock);
                    }
                }
            }

            await queryRunner.commitTransaction();
            return this.findOne(savedReturn.id);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('SALES RETURN ERROR:', error);
            throw new InternalServerErrorException('Error creating sales return');
        } finally {
            await queryRunner.release();
        }
    }
}
