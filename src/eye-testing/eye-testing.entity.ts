import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class EyeTesting {

    @PrimaryGeneratedColumn()
    id: number;

    // ✅ FOREIGN KEY
    @ManyToOne(() => Patient)
    patient: Patient;

    @Column({ nullable: true })
    branchId: number;

    @Column({ nullable: true })
    doctor: string;

    @Column({ nullable: true })
    date: string;

    // RIGHT EYE
    @Column({ nullable: true }) rightSphere: string;
    @Column({ nullable: true }) rightCylinder: string;
    @Column({ nullable: true }) rightAxis: string;

    // LEFT EYE
    @Column({ nullable: true }) leftSphere: string;
    @Column({ nullable: true }) leftCylinder: string;
    @Column({ nullable: true }) leftAxis: string;

    @Column({ nullable: true })
    remark: string;
}
