import { Injectable } from '@nestjs/common';
import { type Book, Prisma } from '@prisma/client';

import { PrismaService } from '@/modules/core/database/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        bookmarks: true,
      },
    });
  }

  async findOne(where): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where,
      include: {
        bookmarks: true,
      },
    });
  }

  async save(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateOne(where, data: Partial<Book>) {
    return this.prisma.book.update({
      where,
      data,
    });
  }

  async deleteOne(where) {
    return this.prisma.book.delete({
      where,
    });
  }
}
