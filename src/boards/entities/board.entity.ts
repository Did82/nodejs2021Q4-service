import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Columns } from './column.entity';
import { Task } from '../../tasks/entities/task.entity';

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

  // @OneToMany(() => Task, (task) => task.board, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  // })
  // task: Task[];
}
