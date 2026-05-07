import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { SalesOrder } from './entities/sales-order.entity';
import { SalesOrderItem } from './entities/sales-order-item.entity';
import { EyePrescription } from './entities/eye-prescription.entity';

@Injectable()
export class SalesOrderService {

    constructor(
        @InjectRepository(SalesOrder)
        private orderRepo: Repository<SalesOrder>,

        @InjectRepository(SalesOrderItem)
        private itemRepo: Repository<SalesOrderItem>,

        @InjectRepository(EyePrescription)
        private eyeRepo: Repository<EyePrescription>,
        
        private dataSource: DataSource
    ) { }

    async create(data: any, branchId?: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const orderData = Array.isArray(data.order) ? data.order[0] : data.order;

            const order = this.orderRepo.create({
                customerId: orderData.customerId,
                branchId: branchId || undefined,
                date: orderData.date,
                total: orderData.total,
                discount: orderData.discount || 0,
                netTotal: orderData.netTotal || orderData.total,
                deliveryDate: orderData.deliveryDate || undefined,
                advanceAmount: orderData.advanceAmount || 0,
                advancePaymentMode: orderData.advancePaymentMode || undefined,
                status: 'Pending'
            } as Partial<SalesOrder>);

            const savedOrder = await queryRunner.manager.save(order);

            // Eye (If applicable)
            if (data.eye) {
                const eye = this.eyeRepo.create({
                    ...data.eye,
                    salesOrderId: savedOrder.id
                });
                await queryRunner.manager.save(eye);
            }

            // Items
            if (data.items && data.items.length) {
                const items = data.items.map((item: any) => queryRunner.manager.create(SalesOrderItem, {
                    salesOrderId: savedOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    rate: item.rate,
                    amount: item.amount
                }));

                await queryRunner.manager.save(SalesOrderItem, items);
            }

            await queryRunner.commitTransaction();
            return { message: "Sales Order Created Successfully", order: savedOrder };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            throw new InternalServerErrorException('Creating Sales Order Failed');
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.orderRepo.find({
            where,
            relations: { customer: true, items: { product: true } }
        });
    }

    async findOne(id: number, branchId?: number) {
        const where: any = { id };
        if (branchId) where.branchId = branchId;
        const order = await this.orderRepo.findOne({
            where,
            relations: { customer: true, items: { product: true } }
        });

        const eye = await this.eyeRepo.findOne({
            where: { salesOrderId: id }
        });

        return { order, eye };
    }
}
