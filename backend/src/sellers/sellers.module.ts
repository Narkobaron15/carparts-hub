import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SellersController } from './sellers.controller';

@Module({
    providers: [SellersService],
    controllers: [SellersController],
    imports: [PrismaModule],
    exports: [SellersService],
})
export class SellersModule {}
