import { Module } from '@nestjs/common';
import { TitleController } from './api/controllers/title.controller';
import { TitleRepositoryImpl } from './data/TitleRepository';
import { TitleFactoryImpl } from './domain/TitleFactory';
import { HealthController } from './api/controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { TrackController } from './api/controllers/track.controller';
import { TrackRepositoryImpl } from './data/TrackRepository';
import { TrackFactoryImpl } from './domain/TrackFactory';

@Module({
  imports: [TerminusModule],
  controllers: [
    TitleController,
    HealthController,
    TrackController
  ],
  providers: [{
    provide: "TitleRepository",
    useValue: TitleRepositoryImpl
  }, {
    provide: "TitleFactory",
    useClass: TitleFactoryImpl
  }, {
    provide: "TrackRepository",
    useValue: TrackRepositoryImpl
  }, {
    provide: "TrackFactory",
    useClass: TrackFactoryImpl
  }],
})
export class AppModule { }
