import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { User as UserEntity } from './entities/user.entity';
import { User } from '@/decorators/user.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async defaultPage() {
    return 'Hi mom';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/follow')
  async followUserById(@Param('id') id: number, @User() user: UserEntity) {
    return this.userService.followUserById(id, user);
  }
}
