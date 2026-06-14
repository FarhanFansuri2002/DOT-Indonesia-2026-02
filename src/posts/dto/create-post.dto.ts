import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Judul post' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Konten post' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
