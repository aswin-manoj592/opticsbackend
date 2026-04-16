import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FrameType } from './frametype.entity';
import { CreateFrameTypeDto } from './dto/create-frametype.dto';
import { UpdateFrameTypeDto } from './dto/update-frametype.dto';

@Injectable()
export class FrametypeService {
  constructor(
    @InjectRepository(FrameType)
    private repo: Repository<FrameType>,
  ) {}

  create(dto: CreateFrameTypeDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, dto: UpdateFrameTypeDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
