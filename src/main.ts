import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();

  const options = new DocumentBuilder()
    .setTitle('Product example')
    .setDescription('The product API description')
    .setVersion('1.0')
    .addTag('products')
    .addTag('order')
    .addTag('auth')
    .addTag('cart')
    .addTag('admin')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
