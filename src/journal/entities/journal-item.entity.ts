import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Journal } from './journal.entity';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class JournalItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  journalId: number;

  @Column()
  accountId: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  debit: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  credit: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Journal, (journal) => journal.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'journalId' })
  journal: Journal;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
