import { Controller, Post, Body, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('patient')
export class PatientController {

  constructor(private readonly service: PatientService) {}

  @Post()
  create(@Body() data: any, @BranchId() branchId: number) {
    return this.service.create(data, branchId);
  }

  @Get()
  findAll(@BranchId() branchId: number) {
    return this.service.findAll(branchId);
  }
}
