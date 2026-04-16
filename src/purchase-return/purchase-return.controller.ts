import { Controller, Post, Body, Get } from '@nestjs/common';
import { PurchaseReturnService } from './purchase-return.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('purchase-return')
export class PurchaseReturnController {

    constructor(private service: PurchaseReturnService) { }

    @Post()
    create(@Body() data: any, @BranchId() branchId: number) {
        return this.service.create(data, branchId);
    }

    @Get()
    findAll(@BranchId() branchId: number) {
        return this.service.findAll(branchId);
    }
}
