import { IsString } from 'class-validator';

export class CreateRepliesDto {
  @IsString()
  description: string;
}
