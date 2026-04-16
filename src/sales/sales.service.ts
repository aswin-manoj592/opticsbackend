import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Sale } from './sales.entity';
import { SaleItem } from './sale-item.entity';
import { Product } from '../product/product.entity';
import { Stock } from '../stock/stock.entity';
import { CreateSalesDto } from './dto/create-sales.dto';

import { SalesOrder } from '../sales-order/entities/sales-order.entity';
import { SalesOrderItem } from '../sales-order/entities/sales-order-item.entity';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class SalesService {

    constructor(
        @InjectRepository(Sale)
        private saleRepo: Repository<Sale>,

        @InjectRepository(SaleItem)
        private saleItemRepo: Repository<SaleItem>,

        @InjectRepository(Product)
        private productRepo: Repository<Product>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,

        private dataSource: DataSource
    ) { }

    // ✅ GET ALL SALES
    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.saleRepo.find({
            where,
            relations: { customer: true, items: { product: true } }
        });
    }

    // ✅ GET ONE SALE
    findOne(id: number, branchId?: number) {
        const where: any = { id };
        if (branchId) where.branchId = branchId;
        return this.saleRepo.findOne({
            where,
            relations: { customer: true, items: { product: true } }
        });
    }

    // ✅ CREATE SALE (MANUAL)
    async create(data: CreateSalesDto, branchId?: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const sale = this.saleRepo.create({
                customerId: data.customerId,
                branchId: branchId || undefined,
                invoiceNo: data.invoiceNo,
                paymentMode: data.paymentMode,
                saleDate: new Date(data.date),
                total: data.total,
                discount: data.discount || 0,
                netTotal: data.netTotal || data.total
            });

            const savedSale = await queryRunner.manager.save(sale);

            const saleItems = data.items.map(item =>
                queryRunner.manager.create(SaleItem, {
                    saleId: savedSale.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    rate: item.rate,
                    amount: item.amount,
                    tax: item.tax || 0
                })
            );

            await queryRunner.manager.save(SaleItem, saleItems);

            // 🔥 STOCK UPDATE
            for (const item of data.items) {
                const stockWhere: any = { productId: item.productId };
                if (branchId) stockWhere.branchId = branchId;
                const stock = await queryRunner.manager.findOne(Stock, {
                    where: stockWhere
                });

                if (stock) {
                    stock.quantity -= Number(item.quantity);
                    await queryRunner.manager.save(stock);
                } else {
                    const newStock = queryRunner.manager.create(Stock, {
                        productId: item.productId,
                        branchId: branchId || undefined,
                        quantity: -Number(item.quantity)
                    });
                    await queryRunner.manager.save(newStock);
                }
            }

            await queryRunner.commitTransaction();

            return this.findOne(savedSale.id);

        } catch (err) {
            await queryRunner.rollbackTransaction();
            console.error('CREATE SALE ERROR:', err);
            throw new InternalServerErrorException('Error creating sale');
        } finally {
            await queryRunner.release();
        }
    }

    // 🔥 CONVERT SALES ORDER → SALE
    async convertToSale(orderId: number, paymentMode?: string, branchId?: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 🔹 1. GET ORDER with items
            const orderWhere: any = { id: orderId };
            const order = await queryRunner.manager.findOne(SalesOrder, {
                where: orderWhere,
                relations: { items: true }
            });

            if (!order) throw new Error("Sales Order not found");
            if (order.status === 'Completed') throw new Error("Already converted");

            if (!order.items || !order.items.length) throw new Error("No items in order");

            // 🔹 3. CREATE SALE
            const sale = queryRunner.manager.create(Sale, {
                customerId: order.customerId,
                branchId: branchId || undefined,
                invoiceNo: `INV-${Date.now()}`,
                paymentMode: paymentMode || 'Cash', // Defaulting to Cash if empty
                saleDate: new Date(),
                total: order.total,
                discount: order.discount || 0,
                netTotal: order.netTotal || order.total
            });

            const savedSale = await queryRunner.manager.save(Sale, sale);

            // 🔹 4. CREATE SALE ITEMS
            const saleItems: SaleItem[] = [];

            for (const oItem of order.items) {
                saleItems.push(queryRunner.manager.create(SaleItem, {
                    saleId: savedSale.id,
                    productId: oItem.productId, // now properly bound via entity relation
                    quantity: oItem.quantity,
                    rate: oItem.rate,
                    amount: oItem.amount,
                    tax: 0 // Default tax, could map if added to SalesOrderItem
                }));
            }

            await queryRunner.manager.save(SaleItem, saleItems);

            // 🔹 5. UPDATE STOCK
            for (const item of saleItems) {
                const stockWhere: any = { productId: item.productId };
                if (branchId) stockWhere.branchId = branchId;
                const stock = await queryRunner.manager.findOne(Stock, {
                    where: stockWhere
                });

                if (stock) {
                    stock.quantity -= Number(item.quantity);
                    await queryRunner.manager.save(stock);
                } else {
                    const newStock = queryRunner.manager.create(Stock, {
                        productId: item.productId,
                        branchId: branchId || undefined,
                        quantity: -Number(item.quantity)
                    });

                    await queryRunner.manager.save(newStock);
                }
            }

            // 🔹 6. MARK ORDER COMPLETED
            order.status = 'Completed';
            await queryRunner.manager.save(SalesOrder, order);

            await queryRunner.commitTransaction();

            return this.findOne(savedSale.id);

        } catch (err) {
            await queryRunner.rollbackTransaction();
            console.error('CONVERT ERROR:', err);
            throw new InternalServerErrorException(err.message || 'Conversion failed');
        } finally {
            await queryRunner.release();
        }
    }

    // ✅ GET SUMMARY REPORT
    async getSalesReport(startDate?: string, endDate?: string, branchId?: number) {
        let query = this.saleRepo.createQueryBuilder('sale')
            .leftJoinAndSelect('sale.items', 'items')
            .leftJoinAndSelect('sale.customer', 'customer')
            .leftJoinAndSelect('items.product', 'product');

        if (branchId) {
            query = query.where('sale.branchId = :branchId', { branchId });
        }

        if (startDate && endDate) {
            query = query.andWhere('sale.saleDate BETWEEN :startDate AND :endDate', { startDate, endDate });
        }

        const sales = await query.getMany();
        
        const totalSales = sales.length;
        const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.total), 0);

        return {
            totalSales,
            totalRevenue,
            sales
        };
    }
}
