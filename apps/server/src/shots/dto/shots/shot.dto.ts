import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class ShotDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  shotImage: string;

  @IsNumber()
  likes: number;

  @IsNumber()
  views: number;

  @IsNumber()
  saves: number;

  // implement comment DTO

  @IsArray()
  tags: string[];
}
