import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async get(where: Prisma.CartWhereUniqueInput): Promise<Cart | null> {
        return await this.prisma.cart.findUnique({ where });
    }

    async getCartByUserId(userId: number): Promise<Cart[]> {
        return await this.prisma.cart.findMany({
            where: {
                user_id: userId
            }
        });
    }

    async create(data: Prisma.CartCreateInput): Promise<Cart> {
        return await this.prisma.cart.create({ data });
    }

    async update(
        where: Prisma.CartWhereUniqueInput, 
        data: Prisma.CartUpdateInput
    ): Promise<Cart> {
        return await this.prisma.cart.update({
            where,
            data
        });
    }

    async delete(where: Prisma.CartWhereUniqueInput): Promise<Cart> {
        return await this.prisma.cart.delete({ where });
    }
}
