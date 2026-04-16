import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { LensOrderService } from './lens-order.service';
import { CreateLensOrderDto } from './lens-order.dto';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('lens-order')
export class LensOrderController {

    constructor(private service: LensOrderService) { }

    // SAVE ORDER
    @Post()
    create(@Body() data: CreateLensOrderDto, @BranchId() branchId: number) {
        return this.service.create(data, branchId);
    }

    // GET ALL ORDERS
    @Get()
    findAll(@BranchId() branchId: number) {
        return this.service.findAll(branchId);
    }

    // GET SINGLE ORDER
    @Get(':id')
    findOne(@Param('id') id: number, @BranchId() branchId: number) {
        return this.service.findOne(id, branchId);
    }

    @Patch('receive/:id')
    receive(@Param('id') id: number, @BranchId() branchId: number) {
        return this.service.receiveLens(id, branchId);
    }
}
