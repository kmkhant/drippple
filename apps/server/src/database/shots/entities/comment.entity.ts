import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Reply } from './reply.entity';
import { User } from '@/users/entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  // implement comment owner
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  description: string;

  // implement reply
  @OneToMany(() => Reply, (reply) => reply.id)
  replies: Reply[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
