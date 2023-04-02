import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Matches, IsNumber } from 'class-validator';

export class QueryByUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
