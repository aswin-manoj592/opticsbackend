import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { ColourCodeService } from './colour-code.service';
import { CreateColourCodeDto } from './dto/create-colour-code.dto';
import { UpdateColourCodeDto } from './dto/update-colour-code.dto';

@Controller('colour-code')
export class ColourCodeController {
    constructor(private service: ColourCodeService) { }

    @Post()
    create(@Body() dto: CreateColourCodeDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateColourCodeDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
