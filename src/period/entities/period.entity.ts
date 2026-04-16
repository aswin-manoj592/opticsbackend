import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Period {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'date', nullable: true })
  fromDate: Date;

  @Column({ type: 'date', nullable: true })
  toDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
