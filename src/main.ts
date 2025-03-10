import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '~/app.module';

const validationPipe = new ValidationPipe({
  transform: true,
});

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // api request validation pipe
  app.useGlobalPipes(validationPipe);
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true,
  });

  // for graceful shutdown
  app.enableShutdownHooks();

  await app.listen(8080);
};

bootstrap();
