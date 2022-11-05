import { Module } from '@nestjs/common';
import { TitleController } from './api/controllers/title.controller';
import { TitleRepositoryImpl } from './data/TitleRepository';
import { TitleFactoryImpl } from './domain/TitleFactory';
import { HealthController } from './api/controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [TitleController, HealthController],
  providers: [{
    provide: "TitleRepository",
    useValue: TitleRepositoryImpl
  }, {
    provide: "TitleFactory",
    useClass: TitleFactoryImpl
  }],
})
export class AppModule { }
