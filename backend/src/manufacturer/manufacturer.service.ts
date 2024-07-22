import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManufacturerService {
    constructor(private prisma: PrismaService) { }

    async get(where: Prisma.ManufacturerWhereUniqueInput) {
        return await this.prisma.manufacturer.findUnique({ where });
    }

    async getMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ManufacturerWhereUniqueInput;
        where?: Prisma.ManufacturerWhereInput;
        orderBy?: Prisma.ManufacturerOrderByWithRelationInput;
    }) {
        return await this.prisma.manufacturer.findMany(params);
    }

    async create(data: Prisma.ManufacturerCreateInput) {
        return await this.prisma.manufacturer.create({ data });
    }

    async update(params: {
        where: Prisma.ManufacturerWhereUniqueInput;
        data: Prisma.ManufacturerUpdateInput;
    }) {
        return await this.prisma.manufacturer.update(params);
    }

    async delete(where: Prisma.ManufacturerWhereUniqueInput) {
        return await this.prisma.manufacturer.delete({ where });
    }
}
