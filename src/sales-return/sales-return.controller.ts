import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SalesReturnService } from './sales-return.service';
import { CreateSalesReturnDto } from './dto/create-sales-return.dto';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('sales-return')
export class SalesReturnController {
    constructor(private readonly salesReturnService: SalesReturnService) {}

    @Get()
    findAll(@BranchId() branchId: number) {
        return this.salesReturnService.findAll(branchId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @BranchId() branchId: number) {
        return this.salesReturnService.findOne(id, branchId);
    }

    @Post()
    create(@Body() data: CreateSalesReturnDto, @BranchId() branchId: number) {
        return this.salesReturnService.create(data, branchId);
    }
}
