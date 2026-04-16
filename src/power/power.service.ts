import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Power } from './power.entity';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';

@Injectable()
export class PowerService {
    constructor(
        @InjectRepository(Power)
        private repo: Repository<Power>,
    ) { }

    create(dto: CreatePowerDto) {
        const data = this.repo.create(dto);
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    update(id: number, dto: UpdatePowerDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
