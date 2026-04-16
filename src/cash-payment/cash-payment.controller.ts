import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CashPaymentService } from './cash-payment.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('cash-payment')
export class CashPaymentController {
  constructor(private readonly cashPaymentService: CashPaymentService) {}

  @Post()
  create(@Body() createCashPaymentDto: any, @BranchId() branchId: number) {
    return this.cashPaymentService.create(createCashPaymentDto, branchId);
  }

  @Get()
  findAll(@BranchId() branchId: number) {
    return this.cashPaymentService.findAll(branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @BranchId() branchId: number) {
    return this.cashPaymentService.findOne(+id, branchId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @BranchId() branchId: number) {
    return this.cashPaymentService.remove(+id, branchId);
  }
}
