import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CashReceiptItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiptId: number;

    @Column()
    customerId: number;

    @Column({ nullable: true })
    description: string;

    @Column()
    amount: number;

    @Column()
    discount: number;

    @Column()
    net: number;

}
