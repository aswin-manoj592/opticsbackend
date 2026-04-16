import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyeTesting } from './eye-testing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EyeTestingService {

    constructor(
        @InjectRepository(EyeTesting)
        private repo: Repository<EyeTesting>,
    ) { }

    create(data: any, branchId?: number) {
        return this.repo.save({
            patient: { id: data.patientId }, // 🔥 KEY POINT
            branchId: branchId || undefined,
            doctor: data.doctor,
            date: data.date,
            rightSphere: data.rightSphere,
            leftSphere: data.leftSphere,
            remark: data.remark
        });
    }

    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.repo.find({ where });
    }
}
