import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShotsController } from './shot.controller';
import { ShotsService } from './shots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shot } from './entities/shot.entity';
import { Comment } from './entities/comment.entity';
import { Reply } from './entities/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shot, Comment, Reply])],
  providers: [ShotsService],
  controllers: [ShotsController],
  exports: [ShotsService],
})
export class ShotModule {}
