import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'Judul blog post yang diperbarui',
    example: 'Judul post yang sudah diupdate',
    minLength: 3,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Konten blog post yang diperbarui',
    example: 'Konten post yang sudah diupdate dengan informasi terbaru...',
    minLength: 10,
  })
  @IsString()
  @IsOptional()
  content?: string;
}
