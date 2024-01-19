import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { WeathergovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'
import { OpenweatherService } from './openweather/openweather.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [WeathergovService, OpenstreetmapService, OpenweatherService],
    }).compile()
  })

  it('should be defined', () => {
    const appController = app.get<AppController>(AppController)
    expect(appController).toBeDefined()
  })
})
