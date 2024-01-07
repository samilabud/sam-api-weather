import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { WeathergovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [WeathergovService, OpenstreetmapService],
    }).compile()
  })

  it('should be defined', () => {
    const appController = app.get<AppController>(AppController)
    expect(appController).toBeDefined()
  })
})
