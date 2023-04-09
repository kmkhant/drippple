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
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { User as UserEntity } from '@/users/entities/user.entity';
import { CollectionService } from './collection.service';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('/user/:id')
  getCollectionsByUser(@Param('id') id: number) {
    return this.collectionService.getCollectionsByUser(id);
  }

  @Get('/:id')
  getCollectionById(@Param('id') id: number) {
    return this.collectionService.getCollectionById(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createCollection(
    @Body() createCollectionDto: CreateCollectionDto,
    @User() user: UserEntity,
  ) {
    return this.collectionService.createCollection(createCollectionDto, user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/edit')
  async editCollection(
    @Param('id') id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @User() user: UserEntity,
  ) {
    return this.collectionService.editCollection(id, updateCollectionDto, user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete')
  async deleteCollection(@Param('id') id: number, @User() user: UserEntity) {
    return this.collectionService.deleteCollection(id, user);
  }

  // Todo Add shot to collections
}
