import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateShotDto } from './dto/shots/create-shot.dto';
import { UpdateShotDto } from './dto/shots/update-shot.dto';

// Comment and Replies
import { CreateCommentDto } from '@/shots/dto/comments/create-comment.dto';

import { Shot } from './entities/shot.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '@/users/entities/user.entity';
import { Reply } from './entities/reply.entity';

import { LikeActionType } from '@drippple/schema';

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

  async likeShotByIdByUser(id: number, user: User) {
    const userInShot = await this.shotRepository.findOne({
      relations: {
        likedUsers: true,
      },
      where: {
        likedUsers: {
          id: user.id,
        },
      },
    });

    // check if user is already liked
    let action: LikeActionType;

    const shot = await this.shotRepository.findOne({
      relations: {
        likedUsers: true,
      },
      where: {
        id: id,
      },
    });

    // if not current user is liked
    if (!userInShot) {
      shot.likedUsers = [...shot.likedUsers, user];
      action = LikeActionType.LIKE;
    } else {
      shot.likedUsers = shot.likedUsers.filter((u) => u.id !== user.id);
      action = LikeActionType.UNLIKE;
    }

    await this.shotRepository.save(shot);
    return { success: 'OK', action: action.toString() };
  }

  async getShotLikesByUsers(id: number) {
    const likeCount = await this.shotRepository
      .createQueryBuilder('shot')
      .loadRelationCountAndMap('shot.totalLikes', 'shot.likedUsers')
      .where('shot.id = :id', { id: id })
      .getOne();

    return { totalLikes: likeCount.totalLikes };
  }

  async getTotalViewsOfShot(id: number) {
    const totalViews = await this.shotRepository
      .createQueryBuilder('shot')
      .loadRelationCountAndMap('shot.totalViews', 'shot.views')
      .where('shot.id = :id', { id: id })
      .getOne();

    return { totalViews: totalViews };
  }

  async addViewToShot(id: number, user: User) {
    const shot = await this.shotRepository.findOne({
      relations: {
        views: true,
      },
      where: {
        id: id,
      },
    });

    if (shot.views.length === 0) {
      shot.views = [...shot.views, user];
      await this.shotRepository.save(shot);
      return { status: 'first view added' };
    }

    // check if user is already viewed
    const viewed = shot.views.filter(
      (current) => current.username === user.username,
    );

    if (viewed.length) {
      // console.log(viewed);
      return { status: 'already viewed' };
    } else {
      shot.views = [...shot.views, user];
      await this.shotRepository.save(shot);
      return { status: 'view added' };
    }
  }

  // filter shots by tags
  async shotByTag(
    tag: string,
    startIndex: number,
    endIndex: number,
  ): Promise<Shot[]> {
    const shots = await this.shotRepository.find({
      where: {
        tags: In([tag]),
      },
    });

    // used splice over slice for performance
    return shots.splice(startIndex, endIndex);
  }

  async debug() {
    return { id: 1 };
  }
}
