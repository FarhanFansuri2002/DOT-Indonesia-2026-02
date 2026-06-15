import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token untuk autentikasi',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;

  @ApiProperty({
    description: 'Tipe token',
    example: 'Bearer',
  })
  token_type!: string;

  @ApiProperty({
    description: 'ID pengguna yang berhasil login',
    example: 1,
  })
  userId!: number;

  @ApiProperty({
    description: 'Username pengguna yang berhasil login',
    example: 'john_doe',
  })
  username!: string;
}
