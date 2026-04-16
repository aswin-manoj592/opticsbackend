import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { SaleItem } from './sale-item.entity';

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column({ nullable: true })
    branchId: number;

    @ManyToOne(() => Customer, { nullable: true })
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column()
    invoiceNo: string;

    @Column()
    paymentMode: string;

    @Column({ type: 'date' })
    saleDate: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    discount: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    netTotal: number;

    @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
    items: SaleItem[];

}
