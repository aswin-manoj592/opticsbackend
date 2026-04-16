import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColourCode } from './colour-code.entity';
import { CreateColourCodeDto } from './dto/create-colour-code.dto';
import { UpdateColourCodeDto } from './dto/update-colour-code.dto';

@Injectable()
export class ColourCodeService {
    constructor(
        @InjectRepository(ColourCode)
        private repo: Repository<ColourCode>,
    ) { }

    create(dto: CreateColourCodeDto) {
        const data = this.repo.create(dto);
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    update(id: number, dto: UpdateColourCodeDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
