import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColourDetails } from './colourdetails.entity';
import { ColourdetailsService } from './colourdetails.service';
import { ColourdetailsController } from './colourdetails.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColourDetails])],
  controllers: [ColourdetailsController],
  providers: [ColourdetailsService],
})
export class ColourdetailsModule { }
