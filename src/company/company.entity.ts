import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    code: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    // 👉 later we can connect account (foreign key)
    @Column({ nullable: true })
    accountId: number;
}
