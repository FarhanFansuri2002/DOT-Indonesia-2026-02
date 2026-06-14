import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, user: User) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        user: {
          connect: { id: user.id },
        },
      },
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: { user: true },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.post.findMany({
      where: { userId },
      include: { user: true },
    });
  }
}
