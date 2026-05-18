import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseReturn } from './purchase-return.entity';
import { Repository, Like } from 'typeorm';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class PurchaseReturnService {

    constructor(
        @InjectRepository(PurchaseReturn)
        private repo: Repository<PurchaseReturn>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) {}

    private async generateInvoiceNumber(branchId?: number): Promise<string> {
        const prefix = 'PR-';
        let whereCondition: any = { invoiceNo: Like(`${prefix}%`) };
        if (branchId) {
            whereCondition.branchId = branchId;
        }

        const lastReturn = await this.repo.findOne({
            where: whereCondition,
            order: { id: 'DESC' },
        });

        let nextSeq = 1;
        if (lastReturn && lastReturn.invoiceNo) {
            const parts = lastReturn.invoiceNo.split('-');
            if (parts.length === 2) {
                const lastSeq = parseInt(parts[1], 10);
                if (!isNaN(lastSeq)) {
                    nextSeq = lastSeq + 1;
                }
            }
        }

        return `${prefix}${nextSeq.toString().padStart(4, '0')}`;
    }

    async create(data: any, branchId?: number) {

        if (!data.invoiceNo || data.invoiceNo.trim() === '') {
            data.invoiceNo = await this.generateInvoiceNumber(branchId);
        }

        const purchaseReturn = this.repo.create({
            ...data,
            branchId: branchId || undefined,
            vendor: { id: data.vendorId }
        });

        const saved: any = await this.repo.save(purchaseReturn);

        // 🔥 REDUCE STOCK
        for (let item of saved.items) {
            let stockWhere: any = { product: { id: item.product.id } };
            if (branchId) stockWhere.branchId = branchId;

            const stock = await this.stockRepo.findOne({
                where: stockWhere,
                relations: ['product']
            });

            if (stock) {
                stock.quantity -= item.quantity;

                if (stock.quantity < 0) {
                    stock.quantity = 0; // safety
                }

                await this.stockRepo.save(stock);
            }
        }

        return saved;
    }

    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.repo.find({
            where,
            relations: ['vendor', 'items', 'items.product']
        });
    }
}
