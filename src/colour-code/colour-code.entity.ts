import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ColourCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    colourCode: string;

    @Column()
    colourName: string;
}
