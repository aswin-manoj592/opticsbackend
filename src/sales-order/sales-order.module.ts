import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesOrder } from './entities/sales-order.entity';
import { SalesOrderItem } from './entities/sales-order-item.entity';
import { EyePrescription } from './entities/eye-prescription.entity';

import { SalesOrderService } from './sales-order.service';
import { SalesOrderController } from './sales-order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalesOrder,
      SalesOrderItem,
      EyePrescription
    ])
  ],
  controllers: [SalesOrderController],
  providers: [SalesOrderService],
})
export class SalesOrderModule { }
