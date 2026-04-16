import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('admin/branches')
export class BranchController {
  constructor(private readonly service: BranchService) {}

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
