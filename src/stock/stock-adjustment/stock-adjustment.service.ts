import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockAdjustment } from './stock-adjustment.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stock.entity';

@Injectable()
export class StockAdjustmentService {

    constructor(
        @InjectRepository(StockAdjustment)
        private adjRepo: Repository<StockAdjustment>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) { }

    async create(data: Partial<StockAdjustment>) {

        const qty = Number(data.quantity);

        // Save adjustment
        const adj = this.adjRepo.create(data);
        await this.adjRepo.save(adj);

        // Find stock
        const stock = await this.stockRepo.findOne({
            where: { product: { id: Number(data.product) } },
            relations: ['product']
        });


        if (!stock) {
            throw new BadRequestException("Product not found in stock");
        }

        if (data.type === "Increase") {
            stock.quantity += qty;
        }

        if (data.type === "Decrease") {
            if (stock.quantity < qty) {
                throw new BadRequestException(`Only ${stock.quantity} available`);
            }
            stock.quantity -= qty;
        }

        await this.stockRepo.save(stock);

        return { message: "Stock updated successfully" };
    }

    findAll() {
        return this.adjRepo.find();
    }
}
