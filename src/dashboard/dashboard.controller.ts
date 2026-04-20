import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboardData(@BranchId() branchId: number, @Query('date') date?: string) {
    return this.dashboardService.getDashboardData(branchId, date);
  }
}
