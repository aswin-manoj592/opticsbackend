import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesmanController } from './salesman.controller';
import { SalesmanService } from './salesman.service';
import { Salesman } from './salesman.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salesman])
  ],
  controllers: [SalesmanController],
  providers: [SalesmanService],
})
export class SalesmanModule { }
