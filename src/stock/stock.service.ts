import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {

    constructor(
        @InjectRepository(Stock)
        private repo: Repository<Stock>,
    ) { }

    // ✅ Get all stock
    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.repo.find({
            where,
            relations: ['product'],
        });
    }

    // ✅ Add stock manually (optional)
    create(data: any, branchId?: number) {
        const stock = this.repo.create({
            productId: data.productId,   // ✅ MUST be passed
            quantity: data.quantity,
            vendor: data.vendor,
            branchId: branchId || undefined
        });

        return this.repo.save(stock);
    }

    // ✅ Delete stock (optional)
    delete(id: number) {
        return this.repo.delete(id);
    }
}
