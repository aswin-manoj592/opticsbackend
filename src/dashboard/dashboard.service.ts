import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../sales/sales.entity';
import { Customer } from '../customers/customer.entity';
import { Stock } from '../stock/stock.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Sale) private readonly saleRepo: Repository<Sale>,
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Stock) private readonly stockRepo: Repository<Stock>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async getDashboardData(branchId?: number, dateQuery?: string) {
    const today = dateQuery ? new Date(dateQuery) : new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    // Total Stats
    const whereCondition = branchId ? { branchId } : {};

    const totalSalesCount = await this.saleRepo.count({ where: whereCondition as any });
    const allSales = await this.saleRepo.find({ where: whereCondition as any });
    const totalRevenue = allSales.reduce((sum, sale) => sum + Number(sale.netTotal || 0), 0);
    const totalCustomerCount = await this.customerRepo.count({ where: whereCondition as any });
    
    const allStocks = await this.stockRepo.find({ where: whereCondition as any });
    const totalStock = allStocks.reduce((sum, stock) => sum + Number(stock.quantity || 0), 0);

    // Today Stats (we need to filter sales by today's date)
    // Depending on DB timezone this might vary, but assuming date comparison works:
    const todaySales = allSales.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      return saleDate >= startOfToday && saleDate < endOfToday;
    });
    const todaySalesCount = todaySales.length;
    const todayRevenue = todaySales.reduce((sum, sale) => sum + Number(sale.netTotal || 0), 0);
    
    // For customers, if there is a createdAt field, we count today's. Let's assume we can fetch them all and filter or just count all.
    // If createdAt doesn't exist, we just return a placeholder or 0.
    const allCustomers = await this.customerRepo.find({ where: whereCondition as any });
    const todayCustomerCount = allCustomers.length > 0 && (allCustomers[0] as any).createdAt 
        ? allCustomers.filter(c => {
            const cDate = new Date((c as any).createdAt);
            return cDate >= startOfToday && cDate < endOfToday;
        }).length 
        : 0;

    const lowStockThreshold = 5;
    const lowStockCount = allStocks.filter(s => s.quantity <= lowStockThreshold).length;

    // Recent Sales for Table
    const recentSalesRows = await this.saleRepo.find({
        where: whereCondition as any,
        order: { id: 'DESC' },
        take: 5,
        relations: ['customer']
    });

    const recentSales = recentSalesRows.map(sale => ({
        id: sale.invoiceNo || `OPT-${sale.id}`,
        customer: sale.customer ? sale.customer.name : 'Walk-in',
        product: "Multiple Items", // We'd need to join sale items to get specific names, simplifying here
        amount: `$${Number(sale.netTotal || 0).toFixed(2)}`,
        status: sale.paymentMode === 'Credit' ? 'Pending' : 'Completed'
    }));

    // Stock Status / Composition
    // We want to group by product Category/Type if possible. 
    // Since Product has type/category, we join them.
    const stocksWithProduct = await this.stockRepo.find({ 
        where: whereCondition as any, 
        relations: ['product'] 
    });
    
    const stockMap = new Map<string, number>();
    stocksWithProduct.forEach(s => {
        const type = s.product && s.product.category ? s.product.category : 'Uncategorized';
        stockMap.set(type, (stockMap.get(type) || 0) + Number(s.quantity));
    });

    const stockCategories = Array.from(stockMap.entries()).map(([name, quantity]) => {
        const percent = totalStock > 0 ? Math.round((quantity / totalStock) * 100) : 0;
        return { name, quantity, percent };
    }).sort((a, b) => b.percent - a.percent);

    return {
        totals: {
            sales: totalSalesCount,
            revenue: totalRevenue,
            customer: totalCustomerCount,
            stock: totalStock
        },
        today: {
            sales: todaySalesCount,
            revenue: todayRevenue,
            customer: todayCustomerCount,
            lowStock: lowStockCount
        },
        recentSales,
        stockCategories
    };
  }
}
