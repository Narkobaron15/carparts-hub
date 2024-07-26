import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
    cors: true, // TODO: Change on production to a specific domain
  });
  await app.listen(port);
  console.log('Server running on port', port);
}
bootstrap();
