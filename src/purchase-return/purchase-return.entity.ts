import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Vendor } from '../vendors/vendor.entity';
import { PurchaseReturnItem } from './purchase-return-item.entity';

@Entity()
export class PurchaseReturn {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Vendor)
    vendor: Vendor;

    @Column({ nullable: true })
    branchId: number;

    @Column({ nullable: true })
    voucherType: string;

    @Column()
    invoiceNo: string;

    @Column()
    date: string;

    @OneToMany(() => PurchaseReturnItem, item => item.purchaseReturn, {
        cascade: true
    })
    items: PurchaseReturnItem[];
}
