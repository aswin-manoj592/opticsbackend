import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdminUser } from '../user/user.entity';

@Entity('admin_branch')
export class AdminBranch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @OneToMany(() => AdminUser, user => user.branch)
  users: AdminUser[];
}
