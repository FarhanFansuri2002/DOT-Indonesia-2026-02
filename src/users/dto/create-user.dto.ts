import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username unik pengguna' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Password pengguna (minimal 6 karakter)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
