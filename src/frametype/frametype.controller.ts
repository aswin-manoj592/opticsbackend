import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { FrametypeService } from './frametype.service';
import { CreateFrameTypeDto } from './dto/create-frametype.dto';
import { UpdateFrameTypeDto } from './dto/update-frametype.dto';

@Controller('frametype')   // ✅ IMPORTANT
export class FrametypeController {
    constructor(private service: FrametypeService) { }

    @Post()
    create(@Body() dto: CreateFrameTypeDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateFrameTypeDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
