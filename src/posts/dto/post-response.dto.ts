import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({
    description: 'ID post yang unik',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Judul post',
    example: 'Memulai dengan NestJS',
  })
  title!: string;

  @ApiProperty({
    description: 'Konten post',
    example: 'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications...',
  })
  content!: string;

  @ApiProperty({
    description: 'ID user yang membuat post',
    example: 1,
  })
  authorId!: number;

  @ApiProperty({
    description: 'Waktu post dibuat',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Waktu post terakhir diperbarui',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt!: Date;
}
