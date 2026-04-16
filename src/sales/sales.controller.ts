import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('sales')
export class SalesController {

  constructor(private readonly salesService: SalesService) { }

  // ✅ SALES REPORT (Must be before :id to prevent conflict)
  @Get('report')
  getSalesReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @BranchId() branchId?: number
  ) {
    return this.salesService.getSalesReport(startDate, endDate, branchId);
  }

  // ✅ GET ALL SALES
  @Get()
  getSales(@BranchId() branchId: number) {
    return this.salesService.findAll(branchId);
  }

  // ✅ GET SINGLE SALE
  @Get(':id')
  getSale(@Param('id', ParseIntPipe) id: number, @BranchId() branchId: number) {
    return this.salesService.findOne(id, branchId);
  }

  // ✅ CREATE SALE (manual)
  @Post()
  createSale(@Body() body: CreateSalesDto, @BranchId() branchId: number) {
    return this.salesService.create(body, branchId);
  }

  // 🔥 CONVERT SALES ORDER → SALE
  @Post('convert/:orderId')
  convertToSale(
      @Param('orderId', ParseIntPipe) orderId: number,
      @Body('paymentMode') paymentMode?: string,
      @BranchId() branchId?: number
  ) {
    return this.salesService.convertToSale(orderId, paymentMode, branchId);
  }

}
