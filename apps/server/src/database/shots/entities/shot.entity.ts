import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '@/users/entities/user.entity';

@Entity('shots')
export class Shot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // implement description
  @Column()
  description: string;

  @Column()
  shotImage: string;

  // shot own user
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column('number', { default: 0 })
  likes: number;

  @Column()
  views: number;

  @Column()
  saves: number;

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[];

  @Column()
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Shot>) {
    Object.assign(this, partial);
  }
}