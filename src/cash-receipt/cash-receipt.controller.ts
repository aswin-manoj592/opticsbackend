import { Controller, Post, Body, Get } from '@nestjs/common';
import { CashReceiptService } from './cash-receipt.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('cash-receipt')
export class CashReceiptController {

  constructor(private readonly service: CashReceiptService) {}

  @Get()
  findAll(@BranchId() branchId: number) {
    return this.service.findAll(branchId);
  }

  @Post()
  create(@Body() data: any, @BranchId() branchId: number) {
    return this.service.create(data, branchId);
  }

}
