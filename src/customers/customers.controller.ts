import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('customers')
export class CustomersController {

    constructor(private readonly customersService: CustomersService) { }

    @Get()
    getCustomers(@BranchId() branchId: number) {
        return this.customersService.findAll(branchId);
    }

    @Post()
    addCustomer(@Body() body: any, @BranchId() branchId: number) {
        return this.customersService.create(body, branchId);
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id: string, @BranchId() branchId: number) {
        return this.customersService.remove(Number(id), branchId);
    }

}
