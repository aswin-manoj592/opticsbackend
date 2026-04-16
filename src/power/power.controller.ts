import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { PowerService } from './power.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';

@Controller('power')   // ✅ IMPORTANT
export class PowerController {
    constructor(private service: PowerService) { }

    @Post()
    create(@Body() dto: CreatePowerDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdatePowerDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
