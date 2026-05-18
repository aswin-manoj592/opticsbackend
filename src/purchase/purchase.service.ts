import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Repository, Like } from 'typeorm';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class PurchaseService {

    constructor(
        @InjectRepository(Purchase)
        private repo: Repository<Purchase>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) {}

    private async generateInvoiceNumber(branchId?: number): Promise<string> {
        const prefix = 'PUR-';
        let whereCondition: any = { invoiceNo: Like(`${prefix}%`) };
        if (branchId) {
            whereCondition.branchId = branchId;
        }

        const lastPurchase = await this.repo.findOne({
            where: whereCondition,
            order: { id: 'DESC' },
        });

        let nextSeq = 1;
        if (lastPurchase && lastPurchase.invoiceNo) {
            const parts = lastPurchase.invoiceNo.split('-');
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

        // ✅ Map vendor FK
        const purchase = this.repo.create({
            ...data,
            vendor: { id: data.vendorId },
            branchId: branchId || undefined
        });

        const saved: any = await this.repo.save(purchase);

        // 🔥 STOCK UPDATE
        for (let item of saved.items) {

            let stockWhere: any = { product: { id: item.product.id } };
            if (branchId) stockWhere.branchId = branchId;

            let stock = await this.stockRepo.findOne({
                where: stockWhere,
                relations: ['product']
            });

            if (stock) {
                stock.quantity += item.quantity;
                await this.stockRepo.save(stock);
            } else {
                await this.stockRepo.save({
                    product: item.product,
                    branchId: branchId || undefined,
                    quantity: item.quantity,
                    vendor: "Purchase"
                });
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
