import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FrameType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    frameTypeCode: string;

    @Column()
    frameTypeName: string;
}
