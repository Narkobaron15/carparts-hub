import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DetailService } from './detail.service';
import { Detail } from '@prisma/client';

@Controller('detail')
export class DetailController {
    constructor(private readonly detailService: DetailService) { }

    @Get()
    async getDetails(
        @Query('skip', ParseIntPipe) skip: number,
        @Query('take', ParseIntPipe) take: number
    ): Promise<Detail[]> {
        return this.detailService.findMany({ skip, take });
    }

    @Get(':id')
    async getDetail(@Param('id') id: string): Promise<Detail> {
        return this.detailService.findOne({ id: Number(id) });
    }

    @Post()
    async createDetail(@Query() data: {
        name: string;
        description: string;
        price: number;
        notes: string;

    }): Promise<Detail> {
        return this.detailService.create(data);
    }

    @Put(':id')
    async updateDetail(
        @Param('id') id: string,
        @Query() data: {
            name: string;
            description: string;
            price: number;
            notes: string;
        }
    ): Promise<Detail> {
        return this.detailService.update({
            where: { id: Number(id) },
            data,
        });
    }

    @Delete(':id')
    async deleteDetail(@Param('id') id: string): Promise<Detail> {
        return this.detailService.delete({ id: Number(id) });
    }
}
