import * as appInsights from 'applicationinsights';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SkillLevel } from './api/models/SkillLevel';
import { AppModule } from './app.module';

if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  appInsights
    .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .start();
}

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
  const app = await NestFactory.create(AppModule, { cors: { origin: /localhost:(80|81)/ } });
  useSwagger(app);

  await app.listen(80);
}
bootstrap();
