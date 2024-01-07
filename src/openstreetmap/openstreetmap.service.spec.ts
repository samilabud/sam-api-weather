import { Test, TestingModule } from '@nestjs/testing'
import { OpenstreetmapService } from './openstreetmap.service'

describe('OpenstreetmapService', () => {
  let service: OpenstreetmapService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenstreetmapService],
    }).compile()

    service = module.get<OpenstreetmapService>(OpenstreetmapService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
