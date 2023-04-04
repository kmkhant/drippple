import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Comment } from './comment.entity';

@Entity('replies')
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  // implement comment owner
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  // implement comment from shots
  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Reply>) {
    Object.assign(this, partial);
  }
}
