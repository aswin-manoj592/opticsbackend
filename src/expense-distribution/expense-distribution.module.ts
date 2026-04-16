import { Module } from '@nestjs/common';
import { ExpenseDistributionController } from './expense-distribution.controller';
import { ExpenseDistributionService } from './expense-distribution.service';

@Module({
  controllers: [ExpenseDistributionController],
  providers: [ExpenseDistributionService]
})
export class ExpenseDistributionModule {}
