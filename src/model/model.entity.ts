import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()   // or @Entity('models')
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelCode: string;

  @Column()
  modelName: string;

  @Column()
  type: string;

  @Column({ default: false })
  expiry: boolean;

  @Column({ default: false })
  nonStockItem: boolean;
}
