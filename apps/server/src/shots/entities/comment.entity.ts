import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Replies } from './replies.entity';
import { User } from '@/users/entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  // implement comment user
  @OneToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  description: string;

  // implement reply
  @OneToMany(() => Replies, (reply) => reply.id)
  replies: Replies[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
