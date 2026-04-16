import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Salesman {   

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  branchId: number;

}
