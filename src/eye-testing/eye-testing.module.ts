import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyeTesting } from './eye-testing.entity';
import { EyeTestingService } from './eye-testing.service';
import { EyeTestingController } from './eye-testing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EyeTesting])],
  providers: [EyeTestingService],
  controllers: [EyeTestingController],
})
export class EyeTestingModule { }
