import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MadeBy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    madeByCode: string;

    @Column()
    madeByName: string;
}
