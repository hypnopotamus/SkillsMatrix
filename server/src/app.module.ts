import { Module } from '@nestjs/common';
import { TitleController } from './api/controllers/title.controller';

@Module({
  imports: [],
  controllers: [TitleController],
  providers: [],
})
export class AppModule { }
