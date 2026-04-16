import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LensColour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lensColourCode: string;

    @Column()
    lensColourName: string;
}
