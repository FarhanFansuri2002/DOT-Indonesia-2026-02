import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.postsService.findByUser(req.user.userId);
  }

  @Post()
  async create(@Request() req: any, @Body() createPostDto: CreatePostDto) {
    const user = await this.usersService.findOne(req.user.userId);
    return this.postsService.create(createPostDto, user);
  }
}
