import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseReturn } from './purchase-return.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class PurchaseReturnService {

    constructor(
        @InjectRepository(PurchaseReturn)
        private repo: Repository<PurchaseReturn>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) {}

    async create(data: any, branchId?: number) {

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
