import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(bodyParser.json({ limit: '10mb' }));
  app.setGlobalPrefix('api');

  const configuration = new DocumentBuilder()
    .setTitle('Productos')
    .setTitle('Api Rest')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
