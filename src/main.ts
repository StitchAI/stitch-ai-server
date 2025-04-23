import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

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
    allowedHeaders: ['Content-Type', 'Accept', 'ApiKey'],
    credentials: true,
  });

  // for graceful shutdown
  app.enableShutdownHooks();

  const apiDocumentOptions = new DocumentBuilder()
    .setTitle('Stitch AI API')
    .setDescription('Stitch AI API')
    .build();
  const apiDocument = SwaggerModule.createDocument(app, apiDocumentOptions);
  const redocOptions: RedocOptions = {
    title: 'Stitch AI API',
    logo: {
      url: 'https://storage.googleapis.com/stitch-ai-assets/logo-text.png',
      backgroundColor: '#fff',
      altText: 'Stitch AI',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
  };
  await RedocModule.setup('/api-docs', app, apiDocument, redocOptions);

  await app.listen(8080);
};

bootstrap();
