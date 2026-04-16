import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {

    constructor(
        @InjectRepository(Warehouse)
        private repo: Repository<Warehouse>,
    ) { }

    create(dto: CreateWarehouseDto) {
        const data = this.repo.create(dto);
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    update(id: number, dto: UpdateWarehouseDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
