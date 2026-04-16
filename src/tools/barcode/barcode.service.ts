import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barcode } from './barcode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BarcodeService {

    constructor(
        @InjectRepository(Barcode)
        private repo: Repository<Barcode>,
    ) { }

    create(data: Partial<Barcode>) {
        const barcode = this.repo.create(data);
        return this.repo.save(barcode);
    }

    findAll() {
        return this.repo.find({ relations: ['rows'] });
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['rows'] });
    }

    async update(id: number, data: Partial<Barcode>) {
        // Find existing to completely replace rows if provided
        const existing = await this.repo.findOne({ where: { id }, relations: ['rows'] });
        if (existing) {
            // TypeORM cascades might not automatically delete removed rows on update using save(),
            // but we'll merge them. For full replacement, usually we clear old rows.
            // Simplified handling: use save to let cascade do its job if using proper cascades,
            // or just save the new object which merges it.
            const updated = this.repo.merge(existing, data);
            return this.repo.save(updated);
        }
        return null;
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
