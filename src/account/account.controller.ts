import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: any, @BranchId() branchId: number) {
    return this.accountService.create(createAccountDto, branchId);
  }

  @Get()
  findAll(@BranchId() branchId: number) {
    return this.accountService.findAll(branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @BranchId() branchId: number) {
    return this.accountService.findOne(+id, branchId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: any, @BranchId() branchId: number) {
    return this.accountService.update(+id, updateAccountDto, branchId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @BranchId() branchId: number) {
    return this.accountService.remove(+id, branchId);
  }
}
