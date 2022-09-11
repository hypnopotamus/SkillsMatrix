import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SkillLevel } from './api/models/SkillLevel';
import { AppModule } from './app.module';

const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Skills Matrix')
    .setDescription('data for Skills Matrix')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      SkillLevel
    ],
  });

  SwaggerModule.setup('swagger', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useSwagger(app);

  await app.listen(3000);
}
bootstrap();
