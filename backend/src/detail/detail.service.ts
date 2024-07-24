import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Detail, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DetailService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService
    ) { }

    async findOne(
        where: Prisma.DetailWhereUniqueInput
    ): Promise<Detail | null> {
        return await this.prisma.detail.findUnique({ where });
    }

    async findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DetailWhereUniqueInput;
        where?: Prisma.DetailWhereInput;
        orderBy?: Prisma.DetailOrderByWithRelationInput;
    }) {
        return await this.prisma.detail.findMany(params);
    }

    async create(data: Prisma.DetailCreateInput): Promise<Detail> {
        return await this.prisma.detail.create({ data });
    }

    async update(params: {
        where: Prisma.DetailWhereUniqueInput;
        data: Prisma.DetailUpdateInput;
    }, username: string): Promise<Detail> {
        const user = await this.usersService.findOneByUsername(username);
        const detail = await this.prisma.detail.findUnique({
            where: params.where
        });
        if (detail.seller_id !== user?.id) {
            throw new ForbiddenException();
        }
        return await this.prisma.detail.update(params);
    }

    async delete(
        where: Prisma.DetailWhereUniqueInput,
        username: string
    ): Promise<Detail> {
        const user = await this.usersService.findOneByUsername(username);
        const detail = await this.prisma.detail.findUnique({ where });
        if (detail.seller_id !== user?.id) {
            throw new ForbiddenException();
        }
        return await this.prisma.detail.delete({ where });
    }
}
