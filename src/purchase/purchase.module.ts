import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Purchase } from './purchase.entity';
import { PurchaseItem } from './purchase-item.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Stock } from '../stock/stock.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Purchase,
            PurchaseItem,
            Stock
        ])
    ],
    providers: [PurchaseService],
    controllers: [PurchaseController],
})
export class PurchaseModule {}
