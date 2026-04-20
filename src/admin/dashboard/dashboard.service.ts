import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../user/user.entity';
import { AdminBranch } from '../branch/branch.entity';
// To actually read products/vendors safely without cyclic imports, 
// we will just use EntityManager to run raw queries for stats.
import { EntityManager } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private em: EntityManager) {}

  async getStats() {
    // We execute raw counts on the known tables
    const userCount = await this.em.query('SELECT COUNT(*) as count FROM admin_user');
    let productCount = [{count: 0}];
    let vendorCount = [{count: 0}];
    let orderCount = [{count: 0}];

    try {
      productCount = await this.em.query('SELECT COUNT(*) as count FROM product');
      vendorCount = await this.em.query('SELECT COUNT(*) as count FROM vendor');
      orderCount = await this.em.query('SELECT COUNT(*) as count FROM sale');
    } catch(e) {}

    let recentOrdersRaw = [];
    let lowStockRaw = [];
    let topVendorsRaw = [];

    try {
      recentOrdersRaw = await this.em.query('SELECT s.id, s.invoiceNo, s.netTotal, c.name as customerName FROM sale s LEFT JOIN customer c ON s.customerId = c.id ORDER BY s.id DESC LIMIT 5');
      lowStockRaw = await this.em.query('SELECT p.productName as product, s.quantity as stock FROM stock s LEFT JOIN product p ON s.productId = p.id WHERE s.quantity <= 5 LIMIT 5');
      topVendorsRaw = await this.em.query('SELECT name FROM vendor LIMIT 5');
    } catch(e) {}

    return {
      users: Number(userCount[0].count),
      products: Number(productCount[0].count),
      vendors: Number(vendorCount[0].count),
      orders: Number(orderCount[0].count),
      
      recentOrders: recentOrdersRaw.map((r: any) => ({
        id: r.invoiceNo || `#${r.id}`,
        customer: r.customerName || 'Walk-in',
        amount: `₹${r.netTotal || 0}`
      })),
      
      lowStock: lowStockRaw,
      
      topVendors: topVendorsRaw.map((r: any) => ({
        name: r.name,
        sales: 'N/A'
      }))
    };
  }
}
