import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(160)
  @IsOptional()
  @IsNotEmpty()
  description: string;
}
