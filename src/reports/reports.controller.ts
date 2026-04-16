import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('reports/mis')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get('bill-wise-profit')
    getBillWiseProfit(@BranchId() branchId: number) {
        return this.reportsService.getBillWiseProfit(branchId);
    }

    @Get('day-end')
    getDayEndSummary(@Query('date') date?: string, @BranchId() branchId?: number) {
        return this.reportsService.getDayEndSummary(date, branchId);
    }
}
