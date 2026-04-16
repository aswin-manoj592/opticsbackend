import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patient)
    private repo: Repository<Patient>,
  ) {}

  create(data: Partial<Patient>, branchId?: number) {
    const patient = this.repo.create({ ...data, branchId: branchId || undefined });
    return this.repo.save(patient);
  }

  findAll(branchId?: number) {
    const where = branchId ? { branchId } : {};
    return this.repo.find({ where });
  }
}
