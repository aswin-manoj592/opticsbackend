import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from '../../customers/customer.entity';
import { Sale } from '../../sales/sales.entity';
import { SalesReturnItem } from './sales-return-item.entity';

@Entity()
export class SalesReturn {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column({ nullable: true })
    branchId: number;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column({ nullable: true })
    saleId: number;

    @ManyToOne(() => Sale, { nullable: true })
    @JoinColumn({ name: 'saleId' })
    sale: Sale;

    @Column({ type: 'date' })
    date: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column({ nullable: true })
    reason: string;

    @OneToMany(() => SalesReturnItem, (item) => item.salesReturn, { cascade: true })
    items: SalesReturnItem[];
}
