import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Salesman } from './salesman.entity';

@Injectable()
export class SalesmanService {

    constructor(
        @InjectRepository(Salesman)
        private repo: Repository<Salesman>,
    ) { }

    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.repo.find({ where });
    }

    create(data: any, branchId?: number) {
        const sm = this.repo.create({ ...data, branchId: branchId || undefined });
        return this.repo.save(sm);
    }

}
