import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateShotDto } from './dto/shots/create-shot.dto';
import { UpdateShotDto } from './dto/shots/update-shot.dto';

// Comment and Replies
import { CreateCommentDto } from './dto/comments/create-comment.dto';
import { UpdateCommentDto } from './dto/comments/update-comment.dto';
import { CreateReplyDto } from './dto/comments/create-reply.dto';
import { UpdateReplyDto } from './dto/comments/update-reply.dto';

import { Shot } from './entities/shot.entity';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
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
}
