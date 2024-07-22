import { Module } from '@nestjs/common';
import { DetailController } from './detail.controller';
import { DetailService } from './detail.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DetailController],
  providers: [DetailService],
  imports: [PrismaModule],
})
export class DetailModule {}
