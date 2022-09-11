import { Module } from '@nestjs/common';
import { TitleController } from './api/controllers/Title.controller';
import { TitleRepositoryImpl } from './data/TitleRepository';
import { TitleFactoryImpl } from './domain/TitleFactory';

@Module({
  imports: [],
  controllers: [TitleController],
  providers: [{
    provide: "TitleRepository",
    useValue: TitleRepositoryImpl
  }, {
    provide: "TitleFactory",
    useClass: TitleFactoryImpl
  }],
})
export class AppModule { }
