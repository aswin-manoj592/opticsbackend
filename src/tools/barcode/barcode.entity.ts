import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BarcodeRow } from './barcode-row.entity';

@Entity()
export class Barcode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    encodedFormat: string;

    @Column({ nullable: true })
    printer: string;

    @Column({ nullable: true })
    fontSize: number;

    @OneToMany(() => BarcodeRow, (row) => row.barcode, { cascade: true })
    rows: BarcodeRow[];
}
