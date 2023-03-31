import { IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  description: string;
}
