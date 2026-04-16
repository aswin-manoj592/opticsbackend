import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaxGroup {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taxGroupCode: string;

    @Column()
    taxGroupName: string;

    @Column('decimal', { precision: 5, scale: 2 })
    taxPercent: number;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    cessPercent: number;
}
