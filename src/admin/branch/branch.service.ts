import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminBranch } from './branch.entity';
import { AdminUser } from '../user/user.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(AdminBranch) private repo: Repository<AdminBranch>,
    @InjectRepository(AdminUser) private userRepo: Repository<AdminUser>
  ) {}

  async create(data: any) { 
    const branch = this.repo.create({ name: data.name, city: data.city });
    const savedBranch = await this.repo.save(branch);

    if (data.managerName && data.managerEmail && data.managerPassword) {
      const user = this.userRepo.create({
        name: data.managerName,
        email: data.managerEmail,
        phone: data.managerPhone || '',
        password: data.managerPassword,
        role: 'manager',
        branch: savedBranch
      });
      await this.userRepo.save(user);
    }
    
    return savedBranch;
  }
  
  findAll() { return this.repo.find({ relations: ['users'] }); }
  
  remove(id: number) { return this.repo.delete(id); }
}
