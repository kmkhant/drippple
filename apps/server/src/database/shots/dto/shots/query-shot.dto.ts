import { User } from '@/users/entities/user.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryByUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
