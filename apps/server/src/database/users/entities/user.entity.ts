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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
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
  @OneToMany(() => Shot, (shot) => shot.id)
  @JoinColumn()
  shots: Shot[];

  // implement collections
  // list of shots from other users
  @OneToMany(() => Collection, (collection) => collection.id)
  collections: Collection[];

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
