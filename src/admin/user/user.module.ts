import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './user.entity';
import { AdminBranch } from '../branch/branch.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, AdminBranch])],
  controllers: [UserController],
  providers: [UserService]
})
export class AdminUserModule {}
