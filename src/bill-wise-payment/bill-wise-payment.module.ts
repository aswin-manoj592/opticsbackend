import { Module } from '@nestjs/common';
import { BillWisePaymentController } from './bill-wise-payment.controller';
import { BillWisePaymentService } from './bill-wise-payment.service';

@Module({
  controllers: [BillWisePaymentController],
  providers: [BillWisePaymentService]
})
export class BillWisePaymentModule {}
