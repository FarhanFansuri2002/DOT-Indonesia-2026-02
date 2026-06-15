import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Judul blog post yang akan dibuat',
    example: 'Memulai dengan NestJS',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Konten lengkap dari blog post',
    example:
      'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications dengan arsitektur yang modular dan scalable.',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
