import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FrameType } from './frametype.entity';
import { FrametypeService } from './frametype.service';
import { FrametypeController } from './frametype.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FrameType])],
  controllers: [FrametypeController],
  providers: [FrametypeService],
})
export class FrametypeModule { }
