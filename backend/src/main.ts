// ✅ Polyfill for Node.js < 19 to support crypto.randomUUID()
import * as crypto from 'crypto';
if (typeof global.crypto === 'undefined') {
  global.crypto = crypto as unknown as Crypto;
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS enabled for frontend access (including WebSocket)
  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
