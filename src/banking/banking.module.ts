import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './banking.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Banking } from './entities/banking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banking])],
  controllers: [BankingController],
  providers: [BankingService]
})
export class BankingModule {}
