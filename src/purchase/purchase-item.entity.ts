import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from '../product/product.entity';

@Entity()
export class PurchaseItem {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.items)
    purchase: Purchase;

    // ✅ Product FK
    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;

    @Column()
    rate: number;

    @Column()
    amount: number;
}
