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

        // Find all stock records for the product
        const stocks = await this.stockRepo.find({
            where: { product: { id: Number(data.product) } },
            relations: ['product']
        });

        if (!stocks || stocks.length === 0) {
            throw new BadRequestException("Product not found in stock");
        }

        if (data.type === "Increase") {
            // Add back to the most recent stock record or first available
            const stockToUpdate = stocks[0];
            stockToUpdate.quantity = Number(stockToUpdate.quantity) + qty;
            await this.stockRepo.save(stockToUpdate);
        }

        if (data.type === "Decrease") {
            const totalStock = stocks.reduce((sum, s) => sum + Number(s.quantity), 0);

            if (totalStock < qty) {
                throw new BadRequestException(`Only ${totalStock} available in stock for this product`);
            }

            let remainingToDecrease = qty;

            // Deduct iteratively across stock lines
            for (const s of stocks) {
                if (remainingToDecrease <= 0) break;

                const currentQty = Number(s.quantity);
                if (currentQty > 0) {
                    if (currentQty >= remainingToDecrease) {
                        s.quantity = currentQty - remainingToDecrease;
                        remainingToDecrease = 0;
                    } else {
                        remainingToDecrease -= currentQty;
                        s.quantity = 0;
                    }
                    await this.stockRepo.save(s);
                }
            }
        }

        return { message: "Stock updated successfully" };
    }

    findAll() {
        return this.adjRepo.find({
            relations: ['product']
        });
    }
}
