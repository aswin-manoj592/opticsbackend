import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LensOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column({ nullable: true })
    branchId: number;

    @Column()
    phone: string;

    @Column()
    vendor: string;

    @Column()
    lensBrand: string;

    @Column()
    lensType: string;

    @Column()
    coating: string;

    // Right Eye
    @Column({ nullable: true })
    rightSPH: string;

    @Column({ nullable: true })
    rightCYL: string;

    @Column({ nullable: true })
    rightAXIS: string;

    // Left Eye
    @Column({ nullable: true })
    leftSPH: string;

    @Column({ nullable: true })
    leftCYL: string;

    @Column({ nullable: true })
    leftAXIS: string;

    @Column({ default: 'Pending' })
    status: string;
}
