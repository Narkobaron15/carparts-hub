import { Injectable, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Public } from 'src/security/public.decorator';

@Injectable()
export class CarsService {
    constructor(private prisma: PrismaService) {}

    async getOne(where: Prisma.CarWhereUniqueInput) {
        return await this.prisma.car.findUnique({ 
            where,
            include: {
                manufacturer: true,
            },
         });
    }

    async getMany(
        skip?: number,
        take?: number,
        cursor?: Prisma.CarWhereUniqueInput,
        orderBy?: Prisma.CarOrderByWithRelationInput,
        where?: Prisma.CarWhereInput,
    ) {
        return await this.prisma.car.findMany({ 
            skip, 
            take,
            cursor,
            orderBy,
            where,
            include: {
                manufacturer: true,
            },
         });
    }

    async create(data: Prisma.CarCreateInput) {
        return await this.prisma.car.create({ data });
    }

    async update(params: {
        where: Prisma.CarWhereUniqueInput;
        data: Prisma.CarUpdateInput;
    }) {
        return await this.prisma.car.update(params);
    }

    async delete(where: Prisma.CarWhereUniqueInput) {
        return await this.prisma.car.delete({ where });
    }
}
