const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/aswin/OneDrive/Desktop/optics/front/opticsback/src/admin';

fs.mkdirSync(basePath, { recursive: true });
fs.mkdirSync(path.join(basePath, 'branch'), { recursive: true });
fs.mkdirSync(path.join(basePath, 'user'), { recursive: true });
fs.mkdirSync(path.join(basePath, 'dashboard'), { recursive: true });

const files = {
  'admin.module.ts': `
import { Module } from '@nestjs/common';
import { AdminBranchModule } from './branch/branch.module';
import { AdminUserModule } from './user/user.module';
import { AdminDashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AdminBranchModule, AdminUserModule, AdminDashboardModule],
})
export class AdminModule {}
`,
  'branch/branch.entity.ts': `
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdminUser } from '../user/user.entity';

@Entity('admin_branch')
export class AdminBranch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @OneToMany(() => AdminUser, user => user.branch)
  users: AdminUser[];
}
`,
  'branch/branch.controller.ts': `
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('admin/branches')
export class BranchController {
  constructor(private readonly service: BranchService) {}

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
`,
  'branch/branch.service.ts': `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminBranch } from './branch.entity';

@Injectable()
export class BranchService {
  constructor(@InjectRepository(AdminBranch) private repo: Repository<AdminBranch>) {}

  create(data: any) { return this.repo.save(data); }
  findAll() { return this.repo.find(); }
  remove(id: number) { return this.repo.delete(id); }
}
`,
  'branch/branch.module.ts': `
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
`,
  'user/user.entity.ts': `
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminBranch } from '../branch/branch.entity';

@Entity('admin_user')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'Active' })
  status: string;

  @ManyToOne(() => AdminBranch, branch => branch.users, { eager: true, nullable: true, onDelete: 'SET NULL' })
  branch: AdminBranch;
}
`,
  'user/user.controller.ts': `
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Put(':id/toggle')
  toggleStatus(@Param('id') id: string) { return this.service.toggleStatus(+id); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
`,
  'user/user.service.ts': `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './user.entity';
import { AdminBranch } from '../branch/branch.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AdminUser) private repo: Repository<AdminUser>,
    @InjectRepository(AdminBranch) private branchRepo: Repository<AdminBranch>
  ) {}

  async create(data: any) {
    const user = this.repo.create(data);
    if (data.branchId) {
      user.branch = await this.branchRepo.findOneBy({ id: data.branchId });
    }
    return this.repo.save(user);
  }

  findAll() { return this.repo.find(); }

  async toggleStatus(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (user) {
      user.status = user.status === 'Active' ? 'Inactive' : 'Active';
      return this.repo.save(user);
    }
    return null;
  }

  remove(id: number) { return this.repo.delete(id); }
}
`,
  'user/user.module.ts': `
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
`,
  'dashboard/dashboard.controller.ts': `
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  getStats() { return this.service.getStats(); }
}
`,
  'dashboard/dashboard.service.ts': `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../user/user.entity';
import { AdminBranch } from '../branch/branch.entity';
// To actually read products/vendors safely without cyclic imports, 
// we will just use EntityManager to run raw queries for stats.
import { EntityManager } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private em: EntityManager) {}

  async getStats() {
    // We execute raw counts on the known tables
    const userCount = await this.em.query('SELECT COUNT(*) as count FROM admin_user');
    let productCount = [{count: 0}];
    let vendorCount = [{count: 0}];
    let orderCount = [{count: 0}];

    try {
      productCount = await this.em.query('SELECT COUNT(*) as count FROM product');
      vendorCount = await this.em.query('SELECT COUNT(*) as count FROM vendor');
      orderCount = await this.em.query('SELECT COUNT(*) as count FROM sales_order');
    } catch(e) {}

    return {
      users: parseInt(userCount[0].count),
      products: parseInt(productCount[0].count),
      vendors: parseInt(vendorCount[0].count),
      orders: parseInt(orderCount[0].count)
    };
  }
}
`,
  'dashboard/dashboard.module.ts': `
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class AdminDashboardModule {}
`
};

for (const [relativePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(basePath, relativePath), content.trim() + '\n');
}
console.log('Admin backend files generated.');
