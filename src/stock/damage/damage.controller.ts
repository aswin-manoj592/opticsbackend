import { Controller, Post, Body, Get } from '@nestjs/common';
import { DamageService } from './damage.service';

@Controller('damage')
export class DamageController {

  constructor(private service: DamageService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
