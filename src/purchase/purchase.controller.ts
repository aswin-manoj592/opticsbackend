import { Controller, Post, Body, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('purchase')
export class PurchaseController {

    constructor(private service: PurchaseService) {}

    @Post()
    create(@Body() data: any, @BranchId() branchId: number) {
        return this.service.create(data, branchId);
    }

    @Get()
    findAll(@BranchId() branchId: number) {
        return this.service.findAll(branchId);
    }
}
