import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async create(data: any, branchId?: number) {
    const newAccount = this.accountRepo.create({ ...data, branchId: branchId || undefined });
    return await this.accountRepo.save(newAccount);
  }

  async findAll(branchId?: number) {
    const where = branchId ? { branchId } : {};
    return await this.accountRepo.find({ where, order: { id: 'DESC' } });
  }

  async findOne(id: number, branchId?: number) {
    const where: any = { id };
    if (branchId) where.branchId = branchId;
    const account = await this.accountRepo.findOne({ where });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async update(id: number, data: any, branchId?: number) {
    const account = await this.findOne(id, branchId);
    Object.assign(account, data);
    return await this.accountRepo.save(account);
  }

  async remove(id: number, branchId?: number) {
    const account = await this.findOne(id, branchId);
    return await this.accountRepo.remove(account);
  }
}
