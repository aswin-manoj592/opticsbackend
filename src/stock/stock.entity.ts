import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Stock {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    branchId: number;

    @Column({ nullable: true })
    productId: number;

    // ✅ Relation
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    // @ManyToOne(() => Product)
    // product: Product; // ✅ LINK TO PRODUCT

    @Column()
    quantity: number;

    @Column({ nullable: true })
    vendor: string;
}
