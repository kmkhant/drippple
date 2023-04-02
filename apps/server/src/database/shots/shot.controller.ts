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
import { Transform } from 'class-transformer';
import { QueryByUserDto } from './dto/shots/query-shot.dto';

@Controller('shots')
export class ShotsController {
  constructor(private readonly shotService: ShotsService) {}

  @Get()
  getShots() {
    return this.shotService.getShots();
  }

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
}
