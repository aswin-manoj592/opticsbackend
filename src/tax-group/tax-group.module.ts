import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaxGroup } from './tax-group.entity';
import { TaxGroupService } from './tax-group.service';
import { TaxGroupController } from './tax-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaxGroup])],
  controllers: [TaxGroupController],
  providers: [TaxGroupService],
})
export class TaxGroupModule { }
