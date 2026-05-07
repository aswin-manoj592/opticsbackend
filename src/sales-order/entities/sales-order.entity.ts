import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from '../../customers/customer.entity';
import { SalesOrderItem } from './sales-order-item.entity';

@Entity()
export class SalesOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column({ nullable: true })
    branchId: number;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column()
    date: string; // Keep as string if frontend sends ISO string without time, or change to date. We'll leave as string to avoid breaking.

    @Column("decimal", { default: 0 })
    total: number;

    @Column("decimal", { default: 0 })
    discount: number;

    @Column("decimal", { default: 0 })
    netTotal: number;

    @Column({ default: 'Pending' })
    status: string;

    @Column({ nullable: true })
    deliveryDate: string;

    @Column("decimal", { default: 0 })
    advanceAmount: number;

    @Column({ nullable: true })
    advancePaymentMode: string;

    @OneToMany(() => SalesOrderItem, item => item.salesOrder, { cascade: true })
    items: SalesOrderItem[];
}
