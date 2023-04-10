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

import { User } from '@/decorators/user.decorator';
import { ShotsService } from './shots.service';
import { CreateShotDto } from './dto/shots/create-shot.dto';
import { UpdateShotDto } from './dto/shots/update-shot.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
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
  async getShotsByUser(@Param('id') id: number) {
    return this.shotService.getShotsByUser(id);
  }

  // Create a shot
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createShot(@Body() createShotDto: CreateShotDto) {
    return this.shotService.createShot(createShotDto);
  }

  // TODO UPDATE - SHOT

  // TODO DELETE SHOT

  // Like a shot
  @UseGuards(JwtAuthGuard)
  @Get('/:id/like')
  async likeShot(@Param('id') id: number, @User() user: UserEntity) {
    return this.shotService.likeShotByIdByUser(id, user);
  }

  @Get('/:id/getLikes')
  async getShotLikesByUsers(@Param('id') id: number) {
    return this.shotService.getShotLikesByUsers(id);
  }

  @Get('/:id/views')
  async getTotalViewsOfShot(@Param('id') id: number) {
    return this.shotService.getTotalViewsOfShot(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/views')
  async addViewToShot(@Param('id') id: number, @User() user: UserEntity) {
    return this.shotService.addViewToShot(id, user);
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

  // Todo Category

  /* just a debug route */
  @Get('/debug')
  debug() {
    return this.shotService.debug();
  }
}
