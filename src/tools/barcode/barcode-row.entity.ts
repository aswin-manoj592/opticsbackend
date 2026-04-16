import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Barcode } from './barcode.entity';

@Entity()
export class BarcodeRow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    barcodeId: number;

    @ManyToOne(() => Barcode, (barcode) => barcode.rows, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'barcodeId' })
    barcode: Barcode;

    @Column({ nullable: true })
    startCharacter: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    encode: string;

    @Column({ nullable: true })
    endCharacter: string;
}
