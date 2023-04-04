import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Shot } from './shot.entity';
import { Reply } from './reply.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  // implement comment owner
  @ManyToOne(() => User, (user) => user.comments, { cascade: true })
  user: User;

  // implement comment from shots
  @ManyToOne(() => Shot, (shot) => shot.comments, { cascade: true })
  shot: Shot;

  @Column()
  description: string;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
