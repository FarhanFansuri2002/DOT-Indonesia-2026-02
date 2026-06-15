import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Request,
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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';

@ApiTags('posts')
@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Dapatkan semua post milik user yang login',
    description:
      'Endpoint untuk mengambil daftar semua blog post yang dibuat oleh user yang sedang login. Hanya post milik user tersebut yang akan ditampilkan.',
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar post berhasil diambil',
    type: [PostResponseDto],
    schema: {
      example: [
        {
          id: 1,
          title: 'Memulai dengan NestJS',
          content:
            'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications...',
          authorId: 1,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
        },
        {
          id: 2,
          title: 'Best Practices dalam REST API',
          content:
            'Mengikuti REST principles untuk membuat API yang konsisten dan mudah digunakan...',
          authorId: 1,
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
  async findAll(@Request() req: any) {
    return this.postsService.findByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Dapatkan detail post berdasarkan ID',
    description: 'Endpoint untuk mengambil detail post spesifik',
  })
  @ApiParam({
    name: 'id',
    description: 'ID post yang ingin diambil',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Detail post berhasil diambil',
    type: PostResponseDto,
    schema: {
      example: {
        id: 1,
        title: 'Memulai dengan NestJS',
        content:
          'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications...',
        authorId: 1,
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
    description: 'Post tidak ditemukan',
    schema: {
      example: {
        statusCode: 404,
        message: 'Post dengan ID 999 tidak ditemukan',
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Buat post baru',
    description:
      'Endpoint untuk membuat blog post baru. Post akan dihubungkan ke user yang sedang login.',
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Data post baru yang ingin dibuat',
    examples: {
      example1: {
        summary: 'Contoh membuat blog post',
        value: {
          title: 'Memulai dengan NestJS',
          content:
            'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications...',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Post berhasil dibuat',
    type: PostResponseDto,
    schema: {
      example: {
        id: 1,
        title: 'Memulai dengan NestJS',
        content:
          'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications...',
        authorId: 1,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Data tidak valid',
    schema: {
      example: {
        statusCode: 400,
        message: [
          {
            field: 'title',
            messages: ['title should not be empty'],
          },
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid atau tidak ada',
  })
  async create(@Request() req: any, @Body() createPostDto: CreatePostDto) {
    const user = await this.usersService.findOne(req.user.userId);
    return this.postsService.create(createPostDto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Perbarui post berdasarkan ID',
    description:
      'Endpoint untuk memperbarui blog post spesifik. Hanya author yang dapat memperbarui post milik mereka.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID post yang ingin diperbarui',
    type: 'number',
    example: 1,
  })
  @ApiBody({
    type: UpdatePostDto,
    description: 'Data post yang ingin diperbarui (opsional)',
    examples: {
      example1: {
        summary: 'Update judul saja',
        value: {
          title: 'Judul post yang baru',
        },
      },
      example2: {
        summary: 'Update konten dan judul',
        value: {
          title: 'Judul yang diperbarui',
          content: 'Konten post yang sudah diperbarui...',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Post berhasil diperbarui',
    type: PostResponseDto,
    schema: {
      example: {
        id: 1,
        title: 'Judul post yang baru',
        content:
          'NestJS adalah framework TypeScript yang powerful untuk membangun server-side applications...',
        authorId: 1,
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
    status: 403,
    description: 'Anda tidak memiliki izin untuk mengubah post ini',
    schema: {
      example: {
        statusCode: 403,
        message: 'Anda hanya bisa mengubah post milik Anda sendiri',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post tidak ditemukan',
  })
  async update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Hapus post berdasarkan ID',
    description:
      'Endpoint untuk menghapus blog post spesifik. Hanya author yang dapat menghapus post milik mereka.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID post yang ingin dihapus',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Post berhasil dihapus',
    schema: {
      example: {
        message: 'Post dengan ID 1 berhasil dihapus',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid atau tidak ada',
  })
  @ApiResponse({
    status: 403,
    description: 'Anda tidak memiliki izin untuk menghapus post ini',
    schema: {
      example: {
        statusCode: 403,
        message: 'Anda hanya bisa menghapus post milik Anda sendiri',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post tidak ditemukan',
  })
  async remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id, req.user.userId);
  }
}
