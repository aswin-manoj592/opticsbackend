import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CashPayment } from './cash-payment.entity';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class CashPaymentItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cashPaymentId: number;

  @Column()
  debtorAccountId: number; // Expense or Vendor account

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  amount: number;

  @ManyToOne(() => CashPayment, (payment) => payment.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cashPaymentId' })
  cashPayment: CashPayment;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'debtorAccountId' })
  debtorAccount: Account;
}
