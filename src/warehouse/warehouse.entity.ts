import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Warehouse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({ nullable: true })
    barcode: string;

    @Column({ nullable: true })
    productName: string;

    @Column({ nullable: true })
    modelCode: string;

    @Column({ nullable: true })
    lensColour: string;

    @Column({ nullable: true })
    madeBy: string;

    @Column({ nullable: true })
    model: string;

    @Column({ nullable: true })
    frameType: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    power: string;

    @Column({ nullable: true })
    colourCode: string;

    @Column({ nullable: true })
    colour: string;

    @Column({ nullable: true })
    brand: string;

    @Column({ nullable: true })
    taxGroup: string;

    @Column({ nullable: true })
    cost: number;

    @Column({ nullable: true })
    rate: number;

    @Column({ nullable: true })
    hsnCode: string;

    @Column({ default: false })
    nonStock: boolean;

    @Column({ nullable: true })
    noOfSticker: number;
}
