import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Damage } from './damage.entity';
import { DamageService } from './damage.service';
import { DamageController } from './damage.controller';
import { Stock } from '../stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Damage, Stock])],
  providers: [DamageService],
  controllers: [DamageController],
})
export class DamageModule { }
