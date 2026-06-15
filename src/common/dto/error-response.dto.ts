import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode!: number;

  @ApiProperty({
    description: 'Pesan error',
    example: 'Username atau password salah',
  })
  message!: string;

  @ApiProperty({
    description: 'Error type',
    example: 'Unauthorized',
  })
  error?: string;
}

export class ValidationErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode!: number;

  @ApiProperty({
    description: 'Daftar error validasi',
    example: [
      {
        field: 'username',
        messages: ['username must be a string', 'username should not be empty'],
      },
    ],
  })
  message!: Array<{ field: string; messages: string[] }>;

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error!: string;
}
