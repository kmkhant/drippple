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
import { Collection } from '@/database/collections/entities/collection.entity';

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
  @ManyToOne(() => User, (user) => user.shots, { onDelete: 'CASCADE' })
  user: User;

  // collection
  @ManyToOne(() => Collection, (collection) => collection.shots, {
    onDelete: 'CASCADE',
  })
  collection: Collection;

  @Column('int', { default: 0 })
  likes: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  saves: number;

  @OneToMany(() => Comment, (comment) => comment.shot)
  @JoinColumn()
  comments: Comment[];

  @Column('varchar', { array: true, nullable: true, default: [] })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Shot>) {
    Object.assign(this, partial);
  }
}
