import { Stock } from 'src/stock/stock.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Stock, (stock) => stock.product)
    stock: Stock[];

    @Column()
    code: string;

    @Column({ nullable: true })
    barcode: string;

    @Column()
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

    @Column({ nullable: true })
    image: string;
}
