import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateShotDto } from './dto/shots/create-shot.dto';
import { UpdateShotDto } from './dto/shots/update-shot.dto';

// Comment and Replies
import { CreateCommentDto } from '@/shots/dto/comments/create-comment.dto';

import { Shot } from './entities/shot.entity';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(Shot) private shotRepository: Repository<Shot>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private dataSource: DataSource,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.create(createCommentDto);
    await this.commentRepository.save(comment);

    return comment;
  }

  // All Shot CRUD
  async createShot(createShotDto: CreateShotDto): Promise<Shot> {
    const shot = this.shotRepository.create(createShotDto);
    await this.shotRepository.save(shot);

    return shot;
  }

  async getShots() {
    const shots = await this.shotRepository.find();
    return shots;
  }

  async updateShot(id: number, updateShotDto: UpdateShotDto) {
    const shot = await this.shotRepository.findOneBy({ id: id });
    const updatedShot = {
      ...shot,
      ...updateShotDto,
    };

    await this.shotRepository.save(updatedShot);

    return updatedShot;
  }

  async deleteShot(id: number) {
    await this.shotRepository.delete(id);
  }

  // get shots by user
  async getShotsByUser(userId: number) {
    const shotsByUser = this.shotRepository
      .createQueryBuilder('shots')
      .where('shots.user.id = :id', { id: userId })
      .getMany();

    return shotsByUser;
  }
}
