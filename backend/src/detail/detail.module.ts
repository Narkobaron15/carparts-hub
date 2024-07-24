import { Module } from '@nestjs/common';
import { DetailController } from './detail.controller';
import { DetailService } from './detail.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DetailController],
  providers: [DetailService],
  imports: [PrismaModule, UsersModule],
})
export class DetailModule {}
