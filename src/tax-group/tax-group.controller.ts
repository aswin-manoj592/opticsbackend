import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxGroupService } from './tax-group.service';
import { CreateTaxGroupDto } from './dto/create-tax-group.dto';
import { UpdateTaxGroupDto } from './dto/update-tax-group.dto';

@Controller('tax-group')
export class TaxGroupController {
    constructor(private readonly service: TaxGroupService) { }

    @Post()
    create(@Body() dto: CreateTaxGroupDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateTaxGroupDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
