import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Warehouse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    warehouseCode: string;

    @Column()
    warehouseName: string;

    @Column({ nullable: true })
    location: string;
}
