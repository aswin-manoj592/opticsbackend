import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Period } from './entities/period.entity';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(Period)
    private readonly periodRepo: Repository<Period>,
  ) {}

  async create(data: any) {
    const newPeriod = this.periodRepo.create(data);
    return await this.periodRepo.save(newPeriod);
  }

  async findAll() {
    return await this.periodRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const period = await this.periodRepo.findOne({ where: { id } });
    if (!period) throw new NotFoundException('Period not found');
    return period;
  }

  async update(id: number, data: any) {
    const period = await this.findOne(id);
    Object.assign(period, data);
    return await this.periodRepo.save(period);
  }

  async remove(id: number) {
    const period = await this.findOne(id);
    return await this.periodRepo.remove(period);
  }
}
