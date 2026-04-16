import { Controller, Post, Body, Get } from '@nestjs/common';
import { StockAdjustmentService } from './stock-adjustment.service';

@Controller('stock-adjustment')
export class StockAdjustmentController {

    constructor(private service: StockAdjustmentService) { }

    @Post()
    create(@Body() data: any) {
        return this.service.create(data);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
}
