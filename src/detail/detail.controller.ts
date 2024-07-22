import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DetailService } from './detail.service';
import { Detail } from '@prisma/client';
import Role from 'src/users/role.enum';
import { Public } from 'src/security/public.decorator';
import { Roles } from 'src/security/roles.decorator';

@Controller('detail')
export class DetailController {
    constructor(private readonly detailService: DetailService) { }

    @Public()
    @Get()
    async getDetails(
        @Query('skip', ParseIntPipe) skip: number,
        @Query('take', ParseIntPipe) take: number
    ): Promise<Detail[]> {
        return await this.detailService.findMany({ skip, take });
    }

    @Public()
    @Get(':id')
    async getDetail(@Param('id', ParseIntPipe) id: number): Promise<Detail> {
        return await this.detailService.findOne({ id });
    }

    @Post()
    @Roles(Role.Admin, Role.Seller)
    async createDetail(@Query() data: {
        name: string;
        description: string;
        price: number;
        notes: string;

    }): Promise<Detail> {
        return await this.detailService.create({
            ...data,
            seller: {
                connect: { user_id: 1 },
            }
        });
    }

    @Put(':id')
    @Roles(Role.Admin, Role.Seller)
    async updateDetail(
        @Param('id', ParseIntPipe) id: number,
        @Query() data: {
            name: string;
            description: string;
            price: number;
            notes: string;
        }
    ): Promise<Detail> {
        return await this.detailService.update({
            where: { id },
            data,
        });
    }

    @Delete(':id')
    @Roles(Role.Admin, Role.Seller)
    async deleteDetail(@Param('id', ParseIntPipe) id: number): Promise<Detail> {
        return await this.detailService.delete({ id });
    }
}
