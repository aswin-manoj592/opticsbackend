import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { LenscolourService } from './lenscolour.service';
import { CreateLensColourDto } from './dto/create-lenscolour.dto';
import { UpdateLensColourDto } from './dto/update-lenscolour.dto';

@Controller('lenscolour')   // ✅ IMPORTANT
export class LenscolourController {
  constructor(private service: LenscolourService) {}

  @Post()
  create(@Body() dto: CreateLensColourDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateLensColourDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
