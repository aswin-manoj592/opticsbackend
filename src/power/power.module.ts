import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Power } from './power.entity';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Power])],
  controllers: [PowerController],
  providers: [PowerService],
})
export class PowerModule {}
