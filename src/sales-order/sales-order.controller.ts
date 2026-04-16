import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SalesOrderService } from './sales-order.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('sales-order')
export class SalesOrderController {

    constructor(private readonly service: SalesOrderService) { }

    @Post()
    create(@Body() body: CreateSalesOrderDto, @BranchId() branchId: number) {
        return this.service.create(body, branchId);
    }

    @Get()
    findAll(@BranchId() branchId: number) {
        return this.service.findAll(branchId);
    }

    @Get(':id')
    findOne(@Param('id') id: number, @BranchId() branchId: number) {
        return this.service.findOne(id, branchId);
    }
}
