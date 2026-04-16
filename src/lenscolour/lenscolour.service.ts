import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LensColour } from './lenscolour.entity';
import { CreateLensColourDto } from './dto/create-lenscolour.dto';
import { UpdateLensColourDto } from './dto/update-lenscolour.dto';

@Injectable()
export class LenscolourService {
    constructor(
        @InjectRepository(LensColour)
        private repo: Repository<LensColour>,
    ) { }

    create(dto: CreateLensColourDto) {
        const data = this.repo.create(dto);
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    update(id: number, dto: UpdateLensColourDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
