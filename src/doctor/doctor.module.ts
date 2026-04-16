import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor])   // ✅ important
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule { }
