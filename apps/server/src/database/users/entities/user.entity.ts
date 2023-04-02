import { Exclude } from 'class-transformer';
import { Shot } from '@/shots/entities/shot.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collection } from '@/database/collections/entities/collection.entity';
import { Comment } from '@/shots/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default:
      'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
  })
  profileImage: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  @Exclude()
  resetToken?: string;

  // implement shots
  // list of user created shots
  @OneToMany(() => Shot, (shot) => shot.user)
  @JoinColumn()
  shots: Shot[];

  // implement collections
  // list of shots from other users
  @OneToMany(() => Collection, (collection) => collection.user)
  @JoinColumn()
  collections: Collection[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @JoinColumn()
  comments: Comment[];

  @Column({ default: 0 })
  likedShots: number;

  @Column()
  provider: 'email' | 'google';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
