import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ColourDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    colourCode: string;

    @Column()
    colourName: string;
}
