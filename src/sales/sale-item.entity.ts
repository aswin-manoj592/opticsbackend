import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from './sales.entity';
import { Product } from '../product/product.entity';

@Entity()
export class SaleItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    saleId: number;

    @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'saleId' })
    sale: Sale;

    @Column()
    productId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    rate: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    tax: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    amount: number;

}
