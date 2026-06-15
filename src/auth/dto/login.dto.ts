import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Username pengguna yang terdaftar di sistem',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'Password pengguna (case-sensitive)',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
