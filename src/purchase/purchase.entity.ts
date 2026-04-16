import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { PurchaseItem } from './purchase-item.entity';
import { Vendor } from '../vendors/vendor.entity';

@Entity()
export class Purchase {

    @PrimaryGeneratedColumn()
    id: number;

    // ✅ Vendor FK
    @ManyToOne(() => Vendor)
    vendor: Vendor;

    @Column({ nullable: true })
    branchId: number;

    @Column()
    invoiceNo: string;

    @Column()
    date: string;

    @Column()
    paymentMode: string;

    @OneToMany(() => PurchaseItem, item => item.purchase, {
        cascade: true
    })
    items: PurchaseItem[];
}
