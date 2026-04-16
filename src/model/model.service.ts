import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Model } from './model.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelService {
    constructor(
        @InjectRepository(Model)
        private modelRepo: Repository<Model>,
    ) { }

    create(dto: CreateModelDto) {
        const model = this.modelRepo.create(dto);
        return this.modelRepo.save(model);   // ✅ SAVES TO DB
    }

    findAll() {
        return this.modelRepo.find();
    }

    findOne(id: number) {
        return this.modelRepo.findOneBy({ id });
    }

    update(id: number, dto: UpdateModelDto) {
        return this.modelRepo.update(id, dto);
    }

    remove(id: number) {
        return this.modelRepo.delete(id);
    }
}
