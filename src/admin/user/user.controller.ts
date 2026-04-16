import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Put(':id/toggle')
  toggleStatus(@Param('id') id: string) { return this.service.toggleStatus(+id); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
