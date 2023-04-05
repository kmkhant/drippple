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
import { User } from '@/users/entities/user.entity';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(Shot) private shotRepository: Repository<Shot>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Reply) private replyRepository: Repository<Reply>,
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

  /* Handle Comments */

  async getCommentsByShotId(id: number) {
    const shot = await this.shotRepository.findOne({
      relations: ['comments', 'comments.replies'],
      where: { id: id },
      order: {
        updatedAt: 'DESC',
      },
    });

    // sort comments by date
    const comments = shot.comments.sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
    );

    return comments;
  }

  // Add Comment To shot By Shot ID
  async addCommentToShotById(
    id: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ) {
    const shot = await this.shotRepository.findOneBy({ id: id });

    const comment = this.commentRepository.create({
      user: user,
      shot: shot,
      ...createCommentDto,
    });

    await this.commentRepository.save(comment);

    return comment;
  }

  // Edit commentByCommentId
  async editCommentById(
    id: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ) {
    // check if comment is owned by user
    const comment = await this.commentRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    // console.log(comment);
    // if so, edit is approved
    if (comment.user.id === user.id) {
      await this.commentRepository.update(
        { id: id },
        {
          ...createCommentDto,
          updatedAt: new Date(),
        },
      );

      return await this.commentRepository.findOneBy({ id: id });
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  async deleteComment(id: number, user: User) {
    // check if user
    const comment = await this.commentRepository.findOne({
      relations: {
        user: true,
      },
      where: { id: id },
    });

    // delete if user own
    if (comment.user.id === user.id) {
      await this.commentRepository.delete({ id: id });
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  /* Handle Replies */

  async addReplyToCommentById(
    commentId: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: {
        replies: true,
      },
    });

    const reply = this.replyRepository.create({
      user: user,
      ...createCommentDto,
      comment: comment,
    });

    if (!comment.replies) {
      comment.replies = [reply];
    } else {
      comment.replies.push(reply);
    }

    await this.replyRepository.save(reply);

    await this.commentRepository.save(comment);

    return reply;
  }

  async editReplyById(replyId: number, replyDto: CreateCommentDto, user: User) {
    const reply = await this.replyRepository.findOne({
      relations: {
        user: true,
      },
      where: { id: replyId },
    });

    if (reply.user.id !== user.id)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    await this.replyRepository.update(
      { id: replyId },
      {
        ...replyDto,
        updatedAt: new Date(),
      },
    );

    return await this.replyRepository.findOneBy({ id: replyId });
  }

  async deleteReply(id: number, user: User) {
    // check if user
    const comment = await this.replyRepository.findOne({
      relations: {
        user: true,
      },
      where: { id: id },
    });

    // delete if user own
    if (comment.user.id === user.id) {
      await this.replyRepository.delete({ id: id });
      return { success: `Removed reply of id: ${id}` };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async debug() {
    // const reply = await this.replyRepository.find({
    //   relations: {
    //     comment: true,
    //   },
    // });
    // console.log(reply);
    await this.commentRepository.delete({ id: 1 });
  }
}
