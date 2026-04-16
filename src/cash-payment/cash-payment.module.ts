import { Module } from '@nestjs/common';
import { CashPaymentController } from './cash-payment.controller';
import { CashPaymentService } from './cash-payment.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CashPayment } from './entities/cash-payment.entity';
import { CashPaymentItem } from './entities/cash-payment-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashPayment, CashPaymentItem])],
  controllers: [CashPaymentController],
  providers: [CashPaymentService]
})
export class CashPaymentModule {}
