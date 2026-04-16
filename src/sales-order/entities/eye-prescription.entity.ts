import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EyePrescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    salesOrderId: number;

    @Column({ nullable: true })
    rightSphere: string;

    @Column({ nullable: true })
    rightCylinder: string;

    @Column({ nullable: true })
    rightAxis: string;

    @Column({ nullable: true })
    rightAdd: string;

    @Column({ nullable: true })
    leftSphere: string;

    @Column({ nullable: true })
    leftCylinder: string;

    @Column({ nullable: true })
    leftAxis: string;

    @Column({ nullable: true })
    leftAdd: string;
}
