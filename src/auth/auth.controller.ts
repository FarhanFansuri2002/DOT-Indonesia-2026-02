import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login dengan username dan password',
    description:
      'Endpoint untuk login user. Mengembalikan JWT token yang dapat digunakan untuk mengakses endpoint yang dilindungi.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credentials pengguna untuk login',
    examples: {
      example1: {
        summary: 'Contoh request login',
        value: {
          username: 'john_doe',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login berhasil, return JWT token',
    type: LoginResponseDto,
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obl9kb2UiLCJpYXQiOjE3MDUzMzAwMDAsImV4cCI6MTcwNTQxNjQwMH0.SIGNATURE',
        token_type: 'Bearer',
        userId: 1,
        username: 'john_doe',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Request tidak valid (username atau password kosong)',
    schema: {
      example: {
        statusCode: 400,
        message: [
          {
            field: 'username',
            messages: ['username should not be empty'],
          },
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Username atau password salah',
    schema: {
      example: {
        statusCode: 401,
        message: 'Username atau password salah',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
