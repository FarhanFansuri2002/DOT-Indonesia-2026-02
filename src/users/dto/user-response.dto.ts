import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID user yang unik',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Username user',
    example: 'john_doe',
  })
  username!: string;

  @ApiProperty({
    description: 'Waktu user dibuat',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Waktu user terakhir diperbarui',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt!: Date;
}
