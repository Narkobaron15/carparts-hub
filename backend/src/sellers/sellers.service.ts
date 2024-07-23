import { Injectable } from '@nestjs/common';
import { Prisma, Seller } from '@prisma/client';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SellersService {
    constructor(private prisma: PrismaService) { }

    async getMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.SellerWhereInput;
        orderBy?: Prisma.SellerOrderByWithRelationInput;
        cursor?: Prisma.SellerWhereUniqueInput;
    }): Promise<Seller[]> {
        return await this.prisma.seller.findMany(params);
    }

    async get(params: {
        where: Prisma.SellerWhereUniqueInput;
    }): Promise<Seller | null> {
        return await this.prisma.seller.findUnique({
            where: params.where
        });
    }

    async create(data: Prisma.SellerCreateInput): Promise<Seller> {
        return await this.prisma.seller.create({ data });
    }

    async update(params: {
        where: Prisma.SellerWhereUniqueInput;
        data: Prisma.SellerUpdateInput;
    }): Promise<Seller> {
        return await this.prisma.seller.update(params);
    }

    async delete(where: Prisma.SellerWhereUniqueInput): Promise<Seller> {
        return await this.prisma.seller.delete({ where });
    }
}
