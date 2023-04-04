import { User } from '@/users/entities/user.entity';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  description: string;
}
