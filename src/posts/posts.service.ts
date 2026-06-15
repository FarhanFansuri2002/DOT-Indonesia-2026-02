import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('Tidak berhak mengubah post ini');
    }
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: { user: true },
    });
  }

  async remove(id: number, userId: number) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('Tidak berhak menghapus post ini');
    }
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
