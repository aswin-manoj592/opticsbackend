import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBranch } from './branch.entity';
import { AdminUser } from '../user/user.entity';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminBranch, AdminUser])],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService]
})
export class AdminBranchModule {}
