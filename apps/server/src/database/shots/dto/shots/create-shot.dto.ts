import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateShotDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9-]+$/, {
    message: 'username can contain only characters, numbers and hyphens',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  shotImage: string;

  @IsString()
  tags: string[];
}
