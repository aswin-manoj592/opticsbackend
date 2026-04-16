import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class StockAdjustment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product: string;

    @Column()
    quantity: number;

    @Column()
    type: string; // Increase / Decrease
}
