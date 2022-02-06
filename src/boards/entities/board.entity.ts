import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Columns } from './column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => Columns, (column) => column.board, {
    eager: true,
    onDelete: 'CASCADE',
  })
  columns: Columns[];
}
