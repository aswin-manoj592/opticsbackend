import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sizeCode: string;

    @Column()
    sizeName: string;
}
