import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  app.enableCors();
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`Server running on -----> ${await app.getUrl()}`);
}
bootstrap();
