import { Body, Controller, DefaultValuePipe, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Public } from 'src/security/public.decorator';
import { Roles } from 'src/security/roles.decorator';
import Role from 'src/users/role.enum';

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }

    @Public()
    @Get()
    async getMany(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number
    ) {
        return await this.carsService.getMany(skip, take);
    }

    @Public()
    @Get(':id')
    async getOne(@Query('id', ParseIntPipe) id: number) {
        return await this.carsService.getOne({ id });
    }

    @Roles(Role.Admin)
    @Post()
    async create(
        @Body('manufacturer_id', ParseIntPipe) manufacturerId: number,
        @Body('model') model: string,
        @Body('year', ParseIntPipe) year: number,
    ) {
        return await this.carsService.create({
            manufacturer: {
                connect: { id: manufacturerId }
            },
            model,
            year,
        });
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(
        @Body('model') model: string,
        @Body('year', ParseIntPipe) year: number,
        @Body('manufacturer_id', ParseIntPipe) manufacturerId: number,
        @Query('id', ParseIntPipe) id: number,
    ) {
        return await this.carsService.update({
            where: { id },
            data: {
                model,
                year,
                manufacturer: {
                    connect: { id: manufacturerId }
                }
            }
        });
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Query('id', ParseIntPipe) id: number) {
        return await this.carsService.delete({ id });
    }
}
