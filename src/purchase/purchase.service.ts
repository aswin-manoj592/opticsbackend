import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class PurchaseService {

    constructor(
        @InjectRepository(Purchase)
        private repo: Repository<Purchase>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) {}

    async create(data: any, branchId?: number) {

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
