import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../sales/sales.entity';
import { CashReceipt } from '../cash-receipt/cash-receipt.entity';
import { SalesOrder } from '../sales-order/entities/sales-order.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Sale)
        private salesRepository: Repository<Sale>,
        @InjectRepository(CashReceipt)
        private cashReceiptRepository: Repository<CashReceipt>,
        @InjectRepository(SalesOrder)
        private salesOrderRepository: Repository<SalesOrder>,
    ) {}

    async getBillWiseProfit(branchId?: number) {
        const where = branchId ? { branchId } : {};
        const sales = await this.salesRepository.find({
            where,
            relations: ['customer', 'items', 'items.product'],
            order: { saleDate: 'DESC', id: 'DESC' }
        });

        let totalRevenue = 0;
        let totalSystemCost = 0;
        let totalGrossProfit = 0;

        const bills = sales.map(sale => {
            let cost = 0;
            let salesAmt = Number(sale.netTotal) || 0;

            sale.items?.forEach(item => {
                const productCost = Number(item.product?.cost) || 0;
                const qty = Number(item.quantity) || 0;
                cost += (productCost * qty);
            });

            totalRevenue += salesAmt;
            totalSystemCost += cost;

            const profit = salesAmt - cost;
            totalGrossProfit += profit;
            
            const percent = salesAmt > 0 ? ((profit / salesAmt) * 100).toFixed(1) : '0.0';

            return {
                id: sale.id,
                invoice: sale.invoiceNo,
                date: sale.saleDate,
                customer: sale.customer ? sale.customer.name : 'Unknown',
                sales: salesAmt,
                cost: cost,
                profit: profit,
                percent: percent + '%',
                status: '✔'
            };
        });

        const avgProfitMargin = totalRevenue > 0 ? ((totalGrossProfit / totalRevenue) * 100).toFixed(2) : '0.00';

        return {
            stats: {
                totalRevenue,
                totalCost: totalSystemCost,
                grossProfit: totalGrossProfit,
                avgProfitMargin: avgProfitMargin + '%'
            },
            bills
        };
    }

    async getDayEndSummary(dateStr?: string, branchId?: number) {
        // If no date provided, use today's date formatted as YYYY-MM-DD
        const targetDate = dateStr || new Date().toISOString().split('T')[0];
        
        const salesWhere: any = { saleDate: targetDate as any };
        if (branchId) salesWhere.branchId = branchId;

        // SQLite or MySQL dates might need proper date matching, string matching 'YYYY-MM-DD' usually works for both if stored simply
        const sales = await this.salesRepository.find({
            where: salesWhere,
            relations: ['customer', 'items', 'items.product']
        });

        const receiptWhere: any = { date: targetDate as any };
        if (branchId) receiptWhere.branchId = branchId;
        const cashReceipts = await this.cashReceiptRepository.find({
            where: receiptWhere
        });

        const orderWhere: any = { date: targetDate };
        if (branchId) orderWhere.branchId = branchId;
        const orders = await this.salesOrderRepository.find({
            where: orderWhere
        });

        const totalSales = sales.reduce((sum, s) => sum + (Number(s.netTotal) || 0), 0);
        const totalCollections = cashReceipts.reduce((sum, c) => sum + (Number(c.total) || 0), 0);
        const newOrdersCount = orders.length;

        const tableData = sales.map(sale => {
            // Get a summary of items (e.g., "Product A, Product B")
            let itemsSummary = '';
            if (sale.items && sale.items.length > 0) {
                itemsSummary = sale.items.map(i => i.product?.productName || 'Unknown').join(', ');
                // Trim if too long
                if (itemsSummary.length > 30) itemsSummary = itemsSummary.substring(0, 27) + '...';
            }

            return {
                id: sale.id,
                invoice: sale.invoiceNo,
                customer: sale.customer ? sale.customer.name : 'Unknown',
                items: itemsSummary || 'No Items',
                method: sale.paymentMode || 'N/A',
                amount: Number(sale.netTotal) || 0
            };
        });

        return {
            date: targetDate,
            stats: {
                totalSales,
                totalCollections,
                newOrdersCount
            },
            tableData
        };
    }
}
