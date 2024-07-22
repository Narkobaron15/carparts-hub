import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ManufacturerService],
  controllers: [ManufacturerController],
  imports: [PrismaModule],
})
export class ManufacturerModule {}
