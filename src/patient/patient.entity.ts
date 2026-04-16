import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNo: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  branchId: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  lensType: string;

  @Column({ nullable: true })
  doctor: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ nullable: true })
  file: string; // prescription file path
}
