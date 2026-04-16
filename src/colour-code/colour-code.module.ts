import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColourCode } from './colour-code.entity';
import { ColourCodeService } from './colour-code.service';
import { ColourCodeController } from './colour-code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColourCode])],
  controllers: [ColourCodeController],
  providers: [ColourCodeService],
})
export class ColourCodeModule { }
