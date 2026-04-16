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
    const user = this.repo.create(data as Partial<AdminUser>);
    if (data.branchId) {
      const branch = await this.branchRepo.findOneBy({ id: data.branchId });
      if (branch) {
        user.branch = branch;
      }
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
