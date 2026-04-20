import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';

import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { BranchesModule } from './branches/branches.module';
import { StockModule } from './stock/stock.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';
import { SettingsModule } from './settings/settings.module';
import { VendorsModule } from './vendors/vendors.module';
import { CashReceiptModule } from './cash-receipt/cash-receipt.module';
import { DoctorModule } from './doctor/doctor.module';
import { ModelModule } from './model/model.module';
import { ColourCodeModule } from './colour-code/colour-code.module';
import { ColourdetailsModule } from './colourdetails/colourdetails.module';
import { LenscolourModule } from './lenscolour/lenscolour.module';
import { SizeModule } from './size/size.module';
import { MadebyModule } from './madeby/madeby.module';
import { FrametypeModule } from './frametype/frametype.module';
import { PowerModule } from './power/power.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { TaxGroupModule } from './tax-group/tax-group.module';
import { LensOrderModule } from './lens-order/lens-order.module';
import { DamageModule } from './stock/damage/damage.module';
import { StockAdjustmentModule } from './stock/stock-adjustment/stock-adjustment.module';
import { PatientModule } from './patient/patient.module';
import { EyeTestingModule } from './eye-testing/eye-testing.module';
import { PurchaseReturnModule } from './purchase-return/purchase-return.module';
import { BarcodeModule } from './tools/barcode/barcode.module';
import { CompanyModule } from './company/company.module';
import { SalesOrderModule } from './sales-order/sales-order.module';
import { SalesReturnModule } from './sales-return/sales-return.module';
import { BulkMessageModule } from './tools/bulk-message/bulk-message.module';
import { PeriodModule } from './period/period.module';
import { AccountModule } from './account/account.module';
import { CashPaymentModule } from './cash-payment/cash-payment.module';
import { BankingModule } from './banking/banking.module';
import { BillWisePaymentModule } from './bill-wise-payment/bill-wise-payment.module';
import { JournalModule } from './journal/journal.module';
import { ExpenseDistributionModule } from './expense-distribution/expense-distribution.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    /* DATABASE CONNECTION */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'optical_crm',
      autoLoadEntities: true,
      synchronize: false,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    /* APPLICATION MODULES */
    ModelModule,
    AuthModule,
    DashboardModule,
    AdminModule,
    CustomersModule,
    OrdersModule,
    BranchesModule,
    StockModule,
    PurchaseModule,
    SalesModule,
    ReportsModule,
    SettingsModule,
    VendorsModule,
    CashReceiptModule,
    DoctorModule,
    ColourCodeModule,
    ColourdetailsModule,
    LenscolourModule,
    SizeModule,
    MadebyModule,
    FrametypeModule,
    PowerModule,
    CategoryModule,
    ProductModule,
    WarehouseModule,
    TaxGroupModule,
    LensOrderModule,
    DamageModule,
    StockAdjustmentModule,
    PatientModule,
    EyeTestingModule,
    PurchaseReturnModule,
    BarcodeModule,
    CompanyModule,
    SalesOrderModule,
    SalesReturnModule,
    BulkMessageModule,
    PeriodModule,
    AccountModule,
    CashPaymentModule,
    BankingModule,
    BillWisePaymentModule,
    JournalModule,
    ExpenseDistributionModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
