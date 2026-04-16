import { Controller, Get, Post, Body } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('vendor')
export class VendorsController {

    constructor(private readonly service: VendorsService) { }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get('getvendors')
    getAll() {
        return this.service.findAll();
    }

}
