import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  async checkIfIsInCart(
    userId: number,
    detailId: number
  ): Promise<boolean> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        user_id: userId,
        detail_id: detailId,
      },
    });
    return !!cart;
  }

  async get(where: Prisma.CartWhereUniqueInput): Promise<Cart | null> {
    return await this.prisma.cart.findUnique({
      where,
      include: {
        detail: true
      },
    });
  }

  async getCartByUserId(
    userId: number,
    skip?: number,
    take?: number,
    cursor?: Prisma.CartWhereUniqueInput,
    orderBy?: Prisma.CartOrderByWithRelationInput,
  ): Promise<Cart[]> {
    return await this.prisma.cart.findMany({
      where: {
        user_id: userId,
      },
      include: {
        detail: true,
      },
      skip,
      take,
      cursor,
      orderBy,
    });
  }

  async create(data: Prisma.CartCreateInput): Promise<Cart> {
    return await this.prisma.cart.create({ data });
  }

  async update(
    where: Prisma.CartWhereUniqueInput,
    data: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    return await this.prisma.cart.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.CartWhereUniqueInput): Promise<Cart> {
    return await this.prisma.cart.delete({ where });
  }
}
