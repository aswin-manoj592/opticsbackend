import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LensOrder } from './lens-order.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class LensOrderService {

    constructor(
        @InjectRepository(LensOrder)
        private repo: Repository<LensOrder>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) { }

    // ✅ Create Order
    create(data: Partial<LensOrder>, branchId?: number) {
        const order = this.repo.create({ ...data, branchId: branchId || undefined });
        return this.repo.save(order);
    }

    // ✅ Get All Orders
    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.repo.find({ where });
    }

    // ✅ Get One Order
    findOne(id: number, branchId?: number) {
        const where: any = { id };
        if (branchId) where.branchId = branchId;
        return this.repo.findOneBy(where);
    }

    // ✅ Receive Lens → Move to Stock
    async receiveLens(id: number, branchId?: number) {

        const where: any = { id };
        if (branchId) where.branchId = branchId;
        const order = await this.repo.findOneBy(where);

        if (!order) {
            throw new Error("Order not found");
        }

        // ✅ Step 1: Update status
        order.status = "Received";
        await this.repo.save(order);

        // ✅ Step 2: Add to stock (MATCHING ENTITY ✅)
        await this.stockRepo.save({
            orderId: order.id,
            branchId: branchId || undefined,
            customerName: order.customerName,
            lensType: order.lensType,
            vendor: order.vendor,
            quantity: 1
        });

        return { message: "Added to stock successfully" };
    }
}
