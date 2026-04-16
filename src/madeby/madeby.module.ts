import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MadeBy } from './madeby.entity';
import { MadebyService } from './madeby.service';
import { MadebyController } from './madeby.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MadeBy])],
  controllers: [MadebyController],
  providers: [MadebyService],
})
export class MadebyModule { }
