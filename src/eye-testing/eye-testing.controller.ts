import { Controller, Post, Body, Get } from '@nestjs/common';
import { EyeTestingService } from './eye-testing.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('eye-testing')
export class EyeTestingController {

    constructor(private readonly service: EyeTestingService) { }

    @Post()
    create(@Body() data: any, @BranchId() branchId: number) {
        return this.service.create(data, branchId);
    }

    @Get()
    findAll(@BranchId() branchId: number) {
        return this.service.findAll(branchId);
    }
}
