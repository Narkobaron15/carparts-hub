import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DetailService } from './detail.service';
import { Detail } from '@prisma/client';
import Role from 'src/users/role.enum';
import { Public } from 'src/security/public.decorator';
import { Roles } from 'src/security/roles.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/security/auth.guard';

@Controller('details')
export class DetailController {
  constructor(
    private readonly detailService: DetailService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Get()
  async getDetails(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
  ): Promise<Detail[]> {
    return await this.detailService.findMany({ skip, take });
  }

  @Public()
  @Get('seller/:id')
  async getDetailsBySeller(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Detail[]> {
    return await this.detailService.findMany({
      skip,
      take,
      where: { seller: { user_id: id } },
    });
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin, Role.Seller)
  @Get('seller')
  async getDetailsOfUser(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
    @Req() req,
  ): Promise<Detail[]> {
    const user = await this.usersService.findOneByUsername(req.user.username);
    if (!user || !user.id) return [];
    return await this.getDetailsBySeller(skip, take, user.id);
  }

  @Public()
  @Get('manufacturer/:id')
  async getDetailsByManufacturer(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
  ): Promise<Detail[]> {
    return await this.detailService.findMany({
      skip,
      take,
      where: { manufacturer: { id } },
    });
  }

  @Public()
  @Get('car/:id')
  async getDetailsByCar(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
  ): Promise<Detail[]> {
    return await this.detailService.findMany({
      skip,
      take,
      where: { car: { id } },
    });
  }

  @Public()
  @Get(':id')
  async getDetail(@Param('id', ParseIntPipe) id: number): Promise<Detail> {
    return await this.detailService.findOne({ id });
  }

  @Post()
  @Roles(Role.Admin, Role.Seller)
  async createDetail(
    @Body()
    data: {
      name: string;
      car_id: string;
      notes: string;
    },
    @Req() req,
  ): Promise<Detail> {
    const user = await this.usersService.findOneByUsername(req.user.username);
    return await this.detailService.create({
      name: data.name,
      car: {
        connect: { id: Number(data.car_id) },
      },
      notes: data.notes,
      seller: {
        connect: { id: user.id },
      },
    });
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Seller)
  async updateDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      name: string;
      description: string;
      price: number;
      notes: string;
    },
    @Req() req,
  ): Promise<Detail> {
    return await this.detailService.update(
      {
        where: { id },
        data,
      },
      req.user.username,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Seller)
  async deleteDetail(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<Detail> {
    return await this.detailService.delete({ id }, req.user.username);
  }
}
