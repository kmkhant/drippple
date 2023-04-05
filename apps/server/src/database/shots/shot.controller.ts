import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Shot } from './entities/shot.entity';
import { User } from '@/decorators/user.decorator';
import { ShotsService } from './shots.service';
import { CreateShotDto } from './dto/shots/create-shot.dto';
import { UpdateShotDto } from './dto/shots/update-shot.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { QueryByUserDto } from './dto/shots/query-shot.dto';
import { CreateCommentDto } from './dto/comments/create-comment.dto';
import { User as UserEntity } from '@/users/entities/user.entity';

@Controller('shots')
export class ShotsController {
  constructor(private readonly shotService: ShotsService) {}

  @Get()
  getShots() {
    return this.shotService.getShots();
  }

  /* Shot Routes */
  // Get shots by user
  @Get('/user/:id')
  async getShotsByUser(@Param('id') queryByUserDto: QueryByUserDto) {
    return this.shotService.getShotsByUser(queryByUserDto.id);
  }

  // Create a shot
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createShot(@Body() createShotDto: CreateShotDto) {
    return this.shotService.createShot(createShotDto);
  }

  /* Comment and Reply Routes */
  // Get comment By shotId
  @Get('/:id/comments')
  async getCommentsByShotId(@Param('id') id: number) {
    return this.shotService.getCommentsByShotId(id);
  }

  // Add Comment to a shot
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/:id/comment/create')
  async addCommentToShotById(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() userEntity: UserEntity,
  ) {
    return this.shotService.addCommentToShotById(
      id,
      createCommentDto,
      userEntity,
    );
  }

  // Edit Comment By Id
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('/comment/:id/edit')
  editCommentById(
    @Param('id') commentId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() userEntity: UserEntity,
  ) {
    return this.shotService.editCommentById(
      commentId,
      createCommentDto,
      userEntity,
    );
  }

  // Edit Comment By Id
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('/comment/reply/edit/:id')
  editReplyById(
    @Param('id') commentId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() userEntity: UserEntity,
  ) {
    return this.shotService.editReplyById(
      commentId,
      createCommentDto,
      userEntity,
    );
  }

  // Delete Comment
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/comment/:id')
  deleteComment(@Param('id') id: number, @User() userEntity: UserEntity) {
    return this.shotService.deleteComment(id, userEntity);
  }

  // Add Reply to a comment
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/comment/:id/reply/create')
  addReplyToCommentById(
    @Param('id') commentId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() userEntity: UserEntity,
  ) {
    return this.shotService.addReplyToCommentById(
      commentId,
      createCommentDto,
      userEntity,
    );
  }

  // Delete Reply
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/reply/:id')
  deleteReply(@Param('id') id: number, @User() userEntity: UserEntity) {
    return this.shotService.deleteReply(id, userEntity);
  }

  /* just a debug route */
  @Get('/debug')
  debug() {
    return this.shotService.debug();
  }
}
