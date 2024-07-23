import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
    cors: true, // TODO: Change on production to a specific domain
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
