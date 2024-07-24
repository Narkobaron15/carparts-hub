import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/security/auth.guard';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    // TODO: Implement pagination
    @UseGuards(AuthGuard)
    @Get()
    async getCartByUser(
        @Request() req: any,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    ) {
        return await this.cartService.getCartByUserId(req.user.id, skip, take);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Body('detail_id', ParseIntPipe) detail_id: number,
        @Body('quantity', ParseIntPipe) quantity: number,
        @Request() req: any
    ) {
        return await this.cartService.create({
            user: {
                connect: { id: req.user.id }
            },
            detail: {
                connect: { id: detail_id }
            },
            quantity
        });
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Body('quantity', ParseIntPipe) quantity: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.cartService.update(
            { id },
            { quantity }
        );
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Request() req: any) {
        return await this.cartService.delete({
            id: req.params.id
        });
    }
}
