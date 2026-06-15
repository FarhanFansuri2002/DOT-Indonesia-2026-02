import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrasi user baru',
    description: 'Endpoint untuk mendaftarkan pengguna baru ke sistem',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data user baru untuk registrasi',
    examples: {
      example1: {
        summary: 'Contoh registrasi user',
        value: {
          username: 'john_doe',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User berhasil dibuat',
    type: UserResponseDto,
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Data tidak valid atau username sudah terdaftar',
    schema: {
      example: {
        statusCode: 400,
        message: [
          {
            field: 'password',
            messages: ['password must be at least 6 characters'],
          },
        ],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Dapatkan daftar semua user',
    description:
      'Endpoint untuk mengambil daftar semua user. Memerlukan JWT token yang valid.',
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar user berhasil diambil',
    type: [UserResponseDto],
    schema: {
      example: [
        {
          id: 1,
          username: 'john_doe',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
        },
        {
          id: 2,
          username: 'jane_smith',
          createdAt: '2024-01-16T15:45:00Z',
          updatedAt: '2024-01-16T15:45:00Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid atau tidak ada',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Dapatkan detail user berdasarkan ID',
    description: 'Endpoint untuk mengambil detail user spesifik',
  })
  @ApiParam({
    name: 'id',
    description: 'ID user yang ingin diambil',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Detail user berhasil diambil',
    type: UserResponseDto,
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid atau tidak ada',
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
    schema: {
      example: {
        statusCode: 404,
        message: 'User dengan ID 999 tidak ditemukan',
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Perbarui user berdasarkan ID',
    description: 'Endpoint untuk memperbarui data user spesifik',
  })
  @ApiParam({
    name: 'id',
    description: 'ID user yang ingin diperbarui',
    type: 'number',
    example: 1,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Data user yang ingin diperbarui (opsional)',
    examples: {
      example1: {
        summary: 'Update username saja',
        value: {
          username: 'john_doe_updated',
        },
      },
      example2: {
        summary: 'Update password saja',
        value: {
          password: 'newpassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User berhasil diperbarui',
    type: UserResponseDto,
    schema: {
      example: {
        id: 1,
        username: 'john_doe_updated',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T11:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid atau tidak ada',
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Hapus user berdasarkan ID',
    description: 'Endpoint untuk menghapus user spesifik',
  })
  @ApiParam({
    name: 'id',
    description: 'ID user yang ingin dihapus',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User berhasil dihapus',
    schema: {
      example: {
        message: 'User dengan ID 1 berhasil dihapus',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid atau tidak ada',
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
