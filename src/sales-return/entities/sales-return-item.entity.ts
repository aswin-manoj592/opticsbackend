import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SalesReturn } from './sales-return.entity';
import { Product } from '../../product/product.entity';

@Entity()
export class SalesReturnItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    salesReturnId: number;

    @ManyToOne(() => SalesReturn, (salesReturn) => salesReturn.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'salesReturnId' })
    salesReturn: SalesReturn;

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
    amount: number;

}
