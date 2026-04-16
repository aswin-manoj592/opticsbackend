import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SalesOrder } from './sales-order.entity';
import { Product } from '../../product/product.entity';

@Entity()
export class SalesOrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    salesOrderId: number;

    @ManyToOne(() => SalesOrder, order => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'salesOrderId' })
    salesOrder: SalesOrder;

    @Column()
    productId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column("int")
    quantity: number;

    @Column("decimal")
    rate: number;

    @Column("decimal", { default: 0 })
    amount: number;
}
