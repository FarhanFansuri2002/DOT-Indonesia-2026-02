import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';

@ApiTags('posts')
@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Dapatkan semua post milik user yang login' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Daftar post berhasil diambil' })
  @Get()
  async findAll(@Request() req: any) {
    return this.postsService.findByUser(req.user.userId);
  }

  @ApiOperation({ summary: 'Buat post baru' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Post berhasil dibuat' })
  @Post()
  async create(@Request() req: any, @Body() createPostDto: CreatePostDto) {
    const user = await this.usersService.findOne(req.user.userId);
    return this.postsService.create(createPostDto, user);
  }
}
