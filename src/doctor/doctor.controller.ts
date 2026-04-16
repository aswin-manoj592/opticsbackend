import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('doctor')
export class DoctorController {

  constructor(private readonly service: DoctorService) {}

  @Get()
  getAll(@BranchId() branchId: number) {
    return this.service.findAll(branchId);
  }

  @Post()
  create(@Body() body: any, @BranchId() branchId: number) {
    return this.service.create(body, branchId);
  }

}
