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
