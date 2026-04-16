import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColourDetails } from './colourdetails.entity';
import { CreateColourDetailsDto } from './dto/create-colourdetails.dto';
import { UpdateColourDetailsDto } from './dto/update-colourdetails.dto';

@Injectable()
export class ColourdetailsService {
    constructor(
        @InjectRepository(ColourDetails)
        private repo: Repository<ColourDetails>,
    ) { }

    create(dto: CreateColourDetailsDto) {
        const data = this.repo.create(dto);
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    update(id: number, dto: UpdateColourDetailsDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
