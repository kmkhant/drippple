import { IsString, IsNotEmpty, Matches, IsArray } from 'class-validator';

export class CreateShotDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  shotImage: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
