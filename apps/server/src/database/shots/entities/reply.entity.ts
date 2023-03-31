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

  // implement reply owner
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  // replies
  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: Comment;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
