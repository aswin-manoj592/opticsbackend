import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBranch } from './branch.entity';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminBranch])],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService]
})
export class AdminBranchModule {}
