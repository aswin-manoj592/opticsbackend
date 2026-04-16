import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminBranch } from '../branch/branch.entity';

@Entity('admin_user')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'Active' })
  status: string;

  @Column({ default: 'password' })
  password: string;

  @Column({ default: 'staff' })
  role: string;

  @ManyToOne(() => AdminBranch, branch => branch.users, { eager: true, nullable: true, onDelete: 'SET NULL' })
  branch: AdminBranch;
}
