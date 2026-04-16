import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {

    constructor(
        @InjectRepository(Company)
        private repo: Repository<Company>,
    ) { }

    // ✅ CREATE
    create(data: any) {
        const company = this.repo.create(data);
        return this.repo.save(company);
    }

    // ✅ GET ALL
    findAll() {
        return this.repo.find();
    }

    // ✅ GET ONE
    async findOne(id: number) {
        const company = await this.repo.findOne({ where: { id } });

        if (!company) {
            throw new NotFoundException("Company not found");
        }

        return company;
    }

    // ✅ UPDATE
    update(id: number, data: any) {
        return this.repo.update(id, data);
    }

    // ✅ DELETE
    delete(id: number) {
        return this.repo.delete(id);
    }
}
