import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MadeBy } from './madeby.entity';
import { CreateMadeByDto } from './dto/create-madeby.dto';
import { UpdateMadeByDto } from './dto/update-madeby.dto';

@Injectable()
export class MadebyService {
    constructor(
        @InjectRepository(MadeBy)
        private repo: Repository<MadeBy>,
    ) { }

    create(dto: CreateMadeByDto) {
        const data = this.repo.create(dto);
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    update(id: number, dto: UpdateMadeByDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
