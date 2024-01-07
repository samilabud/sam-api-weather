import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { WeathergovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [WeathergovService, OpenstreetmapService],
})
export class AppModule {}
