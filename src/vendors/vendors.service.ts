import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vendor } from './vendor.entity';

@Injectable()
export class VendorsService {

    constructor(
        @InjectRepository(Vendor)
        private vendorRepo: Repository<Vendor>,
    ) {}

    /* GET ALL VENDORS */

    async findAll() {
        return await this.vendorRepo.find({
            order: { id: 'DESC' }
        });
    }

    /* GET SINGLE VENDOR */

    async findOne(id: number) {
        const vendor = await this.vendorRepo.findOne({ where: { id } });

        if (!vendor) {
            throw new NotFoundException('Vendor not found');
        }

        return vendor;
    }

    /* CREATE VENDOR */

    async create(data: any) {

        const vendor = this.vendorRepo.create({
            name: data.name,
            contactPerson: data.contactPerson,
            phone: data.phone,
            mobile: data.mobile,
            email: data.email,
            address: data.address,
            place: data.place,
            gstNumber: data.gstNumber,
            tin: data.tin,
            website: data.website,
            paymentTerms: data.paymentTerms,
            creditLimit: Number(data.creditLimit) || 0,
            dueDays: Number(data.dueDays) || 0,
            openingBalance: Number(data.openingBalance) || 0,
            balanceType: data.balanceType || 'Debit'
        });

        const saved = await this.vendorRepo.save(vendor);

        return {
            message: 'Vendor created successfully',
            data: saved
        };
    }

    /* UPDATE VENDOR */

    async update(id: number, data: any) {

        const vendor = await this.findOne(id);

        Object.assign(vendor, data);

        const updated = await this.vendorRepo.save(vendor);

        return {
            message: 'Vendor updated successfully',
            data: updated
        };
    }

    /* DELETE VENDOR */

    async remove(id: number) {

        const vendor = await this.findOne(id);

        await this.vendorRepo.delete(id);

        return {
            message: 'Vendor deleted successfully',
            data: vendor
        };
    }

}
