import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ShotDto } from 'src/shots/dto/shots/shot.dto';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  profileImage: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  // Implement ShotDTO
  shots: ShotDto[];

  // Implement CollectionDTO

  @IsNumber()
  likedShots: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
