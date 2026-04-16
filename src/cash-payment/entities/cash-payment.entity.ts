import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CashPaymentItem } from './cash-payment-item.entity';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class CashPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  paymentNo: string;

  @Column({ nullable: true })
  refNo: string;

  @Column({ nullable: true })
  branchId: number;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ nullable: true })
  creditorAccountId: number; // Bank or Cash account

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'creditorAccountId' })
  creditorAccount: Account;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalAmount: number;

  @OneToMany(() => CashPaymentItem, (item) => item.cashPayment, { cascade: true })
  items: CashPaymentItem[];
}
