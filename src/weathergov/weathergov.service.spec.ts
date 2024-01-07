import { Test, TestingModule } from '@nestjs/testing'
import { WeathergovService } from './weathergov.service'

describe('WeathergovService', () => {
  let service: WeathergovService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeathergovService],
    }).compile()

    service = module.get<WeathergovService>(WeathergovService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
