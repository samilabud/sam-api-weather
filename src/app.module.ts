import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { WeathergovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'
import { OpenweatherService } from './openweather/openweather.service'
import { ApiKeyMiddleware } from './api-key.middleware'
import { ConfigModule } from '@nestjs/config'

ConfigModule.forRoot()
@Module({
  imports: [],
  controllers: [AppController],
  providers: [WeathergovService, OpenstreetmapService, OpenweatherService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ApiKeyMiddleware).forRoutes('*')
  }
}
