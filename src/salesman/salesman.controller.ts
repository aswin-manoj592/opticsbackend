import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('salesman')
export class SalesmanController {

    constructor(private readonly service: SalesmanService) { }

    @Get()
    getAll(@BranchId() branchId: number) {
        return this.service.findAll(branchId);
    }

    @Post()
    create(@Body() body: any, @BranchId() branchId: number) {
        return this.service.create(body, branchId);
    }

}
