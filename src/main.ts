import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
    }),
  );

  app.setGlobalPrefix('catalog');

  const port = process.env.PORT ?? 3001;
  const host = '0.0.0.0';

  await app.listen(port, host, ()=>{
    console.log(`Data log service running on http://${host}:${port}`);
  });
}
bootstrap();
