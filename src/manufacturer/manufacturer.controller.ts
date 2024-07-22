import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { Public } from 'src/security/public.decorator';
import { Roles } from 'src/security/roles.decorator';
import Role from 'src/users/role.enum';

@Controller('manufacturer')
export class ManufacturerController {
    constructor(private manufacturerService: ManufacturerService) { }

    @Public()
    @Get()
    async getMany(
        @Query('skip') skip: number = 0,
        @Query('take') take: number = 10
    ) {
        return await this.manufacturerService.getMany({ skip, take });
    }

    @Public()
    @Get(':id')
    async getOne(id: number) {
        return await this.manufacturerService.get({ id });
    }

    @Roles(Role.Admin)
    @Post()
    async create(
        @Body('name') name: string,
        @Body('description') description: string,
    ) {
        return await this.manufacturerService.create({ name, description });
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(
        @Body('name') name: string,
        @Body('description') description: string,
        @Param('id') id: number
    ) {
        return await this.manufacturerService.update({
            where: { id },
            data: { name, description }
        });
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.manufacturerService.delete({ id });
    }
}
