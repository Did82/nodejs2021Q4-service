import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'uuid', nullable: true })
  columnId: string | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ type: 'uuid', nullable: true })
  boardId: string | null;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Board, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board: Board;
}
