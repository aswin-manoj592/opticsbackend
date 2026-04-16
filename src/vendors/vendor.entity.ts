import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendors') // ✅ FORCE EXACT TABLE NAME
export class Vendor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  place: string;

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  tin: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  paymentTerms: string;

  @Column({ default: 0 })
  creditLimit: number;

  @Column({ default: 0 })
  dueDays: number;

  @Column({ default: 0 })
  openingBalance: number;

  @Column({ default: 'Debit' })
  balanceType: string;
}
