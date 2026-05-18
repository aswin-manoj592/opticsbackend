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

  async getReports() {
    try {
      // 1. Fetch all branches
      const branches = await this.em.query('SELECT id, name FROM admin_branch');
      
      let totalCompanyRevenue = 0;
      const branchReports: any[] = [];

      // Generate date range for the last 7 days
      const last7Days: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split('T')[0]);
      }

      for (const branch of branches) {
        // Fetch total revenue for this branch
        const revenueResult = await this.em.query(
          'SELECT SUM(netTotal) as total FROM sale WHERE branchId = ?', 
          [branch.id]
        );
        const branchRevenue = Number(revenueResult[0]?.total || 0);
        totalCompanyRevenue += branchRevenue;

        // Fetch sales count
        const orderResult = await this.em.query(
          'SELECT COUNT(*) as count FROM sale WHERE branchId = ?',
          [branch.id]
        );
        const branchOrders = Number(orderResult[0]?.count || 0);

        // Fetch daily sales for the graph
        const dailySalesRaw = await this.em.query(
          'SELECT DATE(saleDate) as date, SUM(netTotal) as total FROM sale WHERE branchId = ? AND saleDate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY DATE(saleDate)',
          [branch.id]
        );

        // Map to standard 7 day format so the graph looks clean
        const salesGraph = last7Days.map(dateStr => {
          // find if we had sales on this date
          const match = dailySalesRaw.find((row: any) => {
            const rowDate = new Date(row.date);
            // offset timezone if necessary, but string match on ISO is safest
            return rowDate.toISOString().split('T')[0] === dateStr;
          });
          
          return {
            date: dateStr.split('-').slice(1).join('/'), // e.g. "05/18"
            revenue: match ? Number(match.total) : 0
          };
        });

        branchReports.push({
          id: branch.id,
          name: branch.name,
          revenue: branchRevenue,
          orders: branchOrders,
          salesGraph
        });
      }

      return {
        totalCompanyRevenue,
        branches: branchReports
      };

    } catch (error) {
      console.error('Error fetching admin reports:', error);
      return { totalCompanyRevenue: 0, branches: [] };
    }
  }
}
