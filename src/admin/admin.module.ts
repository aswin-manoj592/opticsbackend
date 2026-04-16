import { Module } from '@nestjs/common';
import { AdminBranchModule } from './branch/branch.module';
import { AdminUserModule } from './user/user.module';
import { AdminDashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AdminBranchModule, AdminUserModule, AdminDashboardModule],
})
export class AdminModule {}
