import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private repo: Repository<Doctor>,
    ) { }

    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.repo.find({ where });
    }

    create(data: any, branchId?: number) {
        const doctor = this.repo.create({ ...data, branchId: branchId || undefined });
        return this.repo.save(doctor);
    }

}
