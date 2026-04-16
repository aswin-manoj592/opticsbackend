import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Damage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product: string;

    @Column()
    reason: string;

    @Column()
    quantity: number;
}
