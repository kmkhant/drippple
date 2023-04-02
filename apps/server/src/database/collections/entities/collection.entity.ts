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
import { User } from '@/users/entities/user.entity';
import { Shot } from '@/shots/entities/shot.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  // implement comment owner
  @ManyToOne(() => User, (user) => user.collections, { onDelete: 'CASCADE' })
  user: User;

  // relation with shots
  @OneToMany(() => Shot, (shot) => shot.collection)
  @JoinColumn()
  shots: Shot[];

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
