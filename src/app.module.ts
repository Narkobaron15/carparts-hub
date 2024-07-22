import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DetailModule } from './detail/detail.module';
import { RolesGuard } from './security/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './security/auth.guard';

@Module({
  imports: [DetailModule, AuthModule, UsersModule, PrismaModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    },
    {
      provide: 'ROLE_GUARD',
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
