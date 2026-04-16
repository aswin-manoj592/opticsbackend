import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,
    ) { }

    findAll(branchId?: number) {
        const where = branchId ? { branchId } : {};
        return this.customerRepo.find({ where });
    }

    async create(data: any, branchId?: number) {

        const lastCustomer = await this.customerRepo.find({
            order: { id: "DESC" },
            take: 1
        });

        let nextNumber = 1;

        if (lastCustomer.length > 0) {
            const lastCode = lastCustomer[0].customerCode;
            const number = parseInt(lastCode.replace("CU", ""));
            nextNumber = number + 1;
        }

        const customerCode = "CU" + String(nextNumber).padStart(4, "0");

        const customer = this.customerRepo.create({
            ...data,
            branchId: branchId || undefined,
            customerCode
        });

        return this.customerRepo.save(customer);
    }

    async remove(id: number, branchId?: number) {
        const where: any = { id };
        if (branchId) where.branchId = branchId;
        const customer = await this.customerRepo.findOne({ where });
        if (customer) {
            return this.customerRepo.remove(customer);
        }
    }

}
