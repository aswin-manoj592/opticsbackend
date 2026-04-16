import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerCode: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  branchId: number;

  @Column()
  type: string;

  @Column({ default: 0 })
  openingBalance: number;

  @Column({ nullable: true })
  creditLimit: number;

  @Column({ nullable: true })
  dueDays: number;

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column()
  phone: string;

  @Column()
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  place: string;

  @Column({ nullable: true })
  address: string;

}
