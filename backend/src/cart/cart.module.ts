import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [PrismaModule],
})
export class CartModule {}
