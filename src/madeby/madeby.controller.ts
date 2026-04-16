import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { MadebyService } from './madeby.service';
import { CreateMadeByDto } from './dto/create-madeby.dto';
import { UpdateMadeByDto } from './dto/update-madeby.dto';

@Controller('madeby')   // ✅ IMPORTANT
export class MadebyController {
    constructor(private service: MadebyService) { }

    @Post()
    create(@Body() dto: CreateMadeByDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateMadeByDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
