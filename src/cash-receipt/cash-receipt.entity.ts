import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CashReceipt {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  receiptNo: string;

  @Column({ nullable: true })
  refNo: string;

  @Column({ nullable: true })
  branchId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  total: number;

}
