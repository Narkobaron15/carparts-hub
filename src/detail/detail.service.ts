import { Injectable } from '@nestjs/common';
import { Detail, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetailService {
    constructor(private prisma: PrismaService) { }
    
    async findOne(where: Prisma.DetailWhereUniqueInput): Promise<Detail | null> {
        return await this.prisma.detail.findUnique({where});
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
    }): Promise<Detail> {
        return await this.prisma.detail.update(params);
    }

    async delete(where: Prisma.DetailWhereUniqueInput): Promise<Detail> {
        return await this.prisma.detail.delete({ where });
    }
}
