import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Damage } from './damage.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stock.entity';

@Injectable()
export class DamageService {

    constructor(
        @InjectRepository(Damage)
        private damageRepo: Repository<Damage>,

        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
    ) { }

    async create(data: Partial<Damage>) {

        const qty = Number(data.quantity); // 👈 convert safely

        const damage = this.damageRepo.create(data);
        await this.damageRepo.save(damage);

        const stock = await this.stockRepo.findOne({
            where: { product: { id: Number(data.product) } },
            relations: ['product']
        });

        if (stock && stock.quantity >= qty) {
            stock.quantity -= qty;
            await this.stockRepo.save(stock);
        } else {
            throw new BadRequestException(`Not enough active stock to process this damage (Found: ${stock?.quantity || 0}).`);
        }

        return { message: "Damage recorded & stock updated" };
    }

    findAll() {
        return this.damageRepo.find();
    }
}
