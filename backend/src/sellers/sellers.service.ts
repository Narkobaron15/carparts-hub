import { Injectable } from '@nestjs/common';
import { Prisma, Seller } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import exclude from 'utils/exclude';

const excludePwd = (seller) => 
  ({ ...seller, user: exclude(seller.user, ['pwd_hash']) })

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
    return (await this.prisma.seller.findMany({
      ...params,
      include: {
        user: true
      }
    })).map(excludePwd);
  }

  async get(params: {
    where: Prisma.SellerWhereUniqueInput;
  }): Promise<Seller | null> {
    return excludePwd(await this.prisma.seller.findUnique({
      where: params.where,
      include: {
        user: true,
      }
    }));
  }

  async create(data: Prisma.SellerCreateInput): Promise<Seller> {
    return excludePwd(await this.prisma.seller.create({ data }));
  }

  async update(params: {
    where: Prisma.SellerWhereUniqueInput;
    data: Prisma.SellerUpdateInput;
  }): Promise<Seller> {
    return excludePwd(await this.prisma.seller.update(params));
  }

  async delete(where: Prisma.SellerWhereUniqueInput): Promise<Seller> {
    return excludePwd(await this.prisma.seller.delete({ where }));
  }
}
