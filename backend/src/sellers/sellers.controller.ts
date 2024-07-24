import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Seller } from '@prisma/client';
import { Public } from 'src/security/public.decorator';
import { SellersService } from './sellers.service';
import Role from 'src/users/role.enum';
import { Roles } from 'src/security/roles.decorator';

@Controller('sellers')
export class SellersController {
    constructor(private sellersService: SellersService) { }
    
    @Public()
    @Get()
    async getSellers(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
    ): Promise<Seller[]> {
        return await this.sellersService.getMany({
            skip,
            take
        });
    }

    @Public()
    @Get(':id')
    async getSeller(@Param('id') id: number): Promise<Seller> {
        return await this.sellersService.get({
            where: { id: id }
        });
    }

    @Roles(Role.Admin)
    @Post()
    async createSeller(
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('user_id', ParseIntPipe) user_id: number
    ): Promise<Seller> {
        return await this.sellersService.create({
            name,
            description,
            user: { connect: { id: user_id } }
        });
    }

    @Roles(Role.Admin)
    @Put(':id')
    async updateSeller(
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('user_id', ParseIntPipe) id: number
    ): Promise<Seller> {
        return await this.sellersService.update({
            where: { id: id },
            data: { name, description, user: { connect: { id } } }
        });
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async deleteSeller(@Param('id') id: number): Promise<Seller> {
        return await this.sellersService.delete({ id: id})
    }
}
