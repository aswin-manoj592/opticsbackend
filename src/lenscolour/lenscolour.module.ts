import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LensColour } from './lenscolour.entity';
import { LenscolourService } from './lenscolour.service';
import { LenscolourController } from './lenscolour.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LensColour])],
  controllers: [LenscolourController],
  providers: [LenscolourService],
})
export class LenscolourModule {}
