import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PurchaseReturn } from './purchase-return.entity';
import { Product } from '../product/product.entity';

@Entity()
export class PurchaseReturnItem {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PurchaseReturn, pr => pr.items)
    purchaseReturn: PurchaseReturn;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;

    @Column()
    rate: number;

    @Column()
    amount: number;
}
