import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    @Get()
    async getCartByUser(@Request() req: any) {
        return this.cartService.getCartByUserId(req.user.id);
    }

    @Post()
    async create(
        @Body('detail_id', ParseIntPipe) detail_id: number,
        @Body('quantity', ParseIntPipe) quantity: number,
        @Request() req: any
    ) {
        return this.cartService.create({
            user: {
                connect: { id: req.user.id }
            },
            detail: {
                connect: { id: detail_id }
            },
            quantity
        });
    }

    @Put(':id')
    async update(
        @Body('quantity', ParseIntPipe) quantity: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.cartService.update(
            { id },
            { quantity }
        );
    }

    @Delete(':id')
    async delete(@Request() req: any) {
        return this.cartService.delete({
            id: req.params.id
        });
    }
}
