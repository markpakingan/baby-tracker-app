// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// const PORT = process.env.PORT || 3000;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(PORT);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
