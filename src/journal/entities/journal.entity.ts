import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JournalItem } from './journal-item.entity';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  entryNo: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => JournalItem, (item) => item.journal, { cascade: true })
  items: JournalItem[];
}
