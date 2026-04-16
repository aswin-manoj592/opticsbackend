import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {

    constructor(private service: CompanyService) {}

    @Post()
    create(@Body() data: any) {
        return this.service.create(data);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: any) {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(Number(id));
    }
}
