import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import exclude from 'utils/exclude';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({ where });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async findOneByUsername(username: string) {
    return await this.prisma.user.findFirst({ where: { username } })
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return (await this.prisma.user.findMany(params))
      .map((user) => exclude(user, ['pwd_hash']));
  }

  async create(data: Prisma.UserCreateInput) {
    return exclude(await this.prisma.user.create({ data }), ['pwd_hash']);
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    return exclude(await this.prisma.user.update(params), ['pwd_hash']);
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    return exclude(await this.prisma.user.delete({ where }), ['pwd_hash']);
  }
}
