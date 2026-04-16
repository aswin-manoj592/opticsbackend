import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('size')
export class SizeController {
    constructor(private service: SizeService) { }

    @Post()
    create(@Body() dto: CreateSizeDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateSizeDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
