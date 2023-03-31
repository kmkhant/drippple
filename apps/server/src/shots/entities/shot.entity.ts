import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity('shots')
export class Shot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // implement markdown data store
  @Column()
  description: string;

  @Column()
  shotImage: string;

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
