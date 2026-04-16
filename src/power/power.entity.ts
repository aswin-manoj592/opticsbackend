import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Power {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    powerCode: string;

    @Column()
    powerName: string;
}
