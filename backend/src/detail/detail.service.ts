import { ForbiddenException, Injectable } from '@nestjs/common';
import { Detail, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DetailService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) { }

  async findOne(where: Prisma.DetailWhereUniqueInput): Promise<Detail | null> {
    return await this.prisma.detail.findUnique({
      where,
      include: {
        manufacturer: true,
        seller: true,
      }
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DetailWhereUniqueInput;
    where?: Prisma.DetailWhereInput;
    orderBy?: Prisma.DetailOrderByWithRelationInput;
  }) {
    return await this.prisma.detail.findMany({
      ...params,
      include: {
        manufacturer: true,
        seller: true,
      },
    });
  }

  async create(data: Prisma.DetailCreateInput): Promise<Detail> {
    return await this.prisma.detail.create({ data });
  }

  async update(
    params: {
      where: Prisma.DetailWhereUniqueInput;
      data: Prisma.DetailUpdateInput;
    },
    username: string,
  ): Promise<Detail> {
    const user = await this.usersService.findOneByUsername(username);
    const detail = await this.prisma.detail.findUnique({
      where: params.where,
      include: {
        seller: true
      }
    });
    if (detail.seller.user_id !== user?.id) {
      throw new ForbiddenException();
    }
    return await this.prisma.detail.update(params);
  }

  async delete(
    where: Prisma.DetailWhereUniqueInput,
    username: string,
  ): Promise<Detail> {
    const user = await this.usersService.findOneByUsername(username);
    const detail = await this.prisma.detail.findUnique({
      where,
      include: {
        seller: true
      }
    });
    if (detail.seller.user_id !== user?.id) {
      throw new ForbiddenException();
    }
    return await this.prisma.detail.delete({ where });
  }
}
