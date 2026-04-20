import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brandCode: string;

  @Column()
  brandName: string;
}
