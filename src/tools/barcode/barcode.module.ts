import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcode } from './barcode.entity';
import { BarcodeRow } from './barcode-row.entity';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Barcode, BarcodeRow])],
  providers: [BarcodeService],
  controllers: [BarcodeController],
})
export class BarcodeModule { }
