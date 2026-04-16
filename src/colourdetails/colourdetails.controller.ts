import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { ColourdetailsService } from './colourdetails.service';
import { CreateColourDetailsDto } from './dto/create-colourdetails.dto';
import { UpdateColourDetailsDto } from './dto/update-colourdetails.dto';

@Controller('colourdetails')   // ✅ IMPORTANT
export class ColourdetailsController {
    constructor(private service: ColourdetailsService) { }

    @Post()
    create(@Body() dto: CreateColourDetailsDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateColourDetailsDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
