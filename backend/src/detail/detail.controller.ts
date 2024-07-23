import { Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
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
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number
    ): Promise<Detail[]> {
        return await this.detailService.findMany({ skip, take });
    }

    @Public()
    @Get('seller/:id')
    async getDetailsBySeller(
        @Param('id', ParseIntPipe) id: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number
    ): Promise<Detail[]> {
        return await this.detailService.findMany({
            skip,
            take,
            where: { seller: { user_id: id } }
        });
    }

    @Public()
    @Get('manufacturer/:id')
    async getDetailsByManufacturer(
        @Param('id', ParseIntPipe) id: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number
    ): Promise<Detail[]> {
        return await this.detailService.findMany({
            skip,
            take,
            where: { manufacturer: { id } }
        });
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
