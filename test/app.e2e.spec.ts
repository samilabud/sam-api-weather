import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'

const HEADER_API_KEY = 'SamAPI-Key'
const API_KEY = 'nextweatherwatch-123456'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let httpServer: any

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    httpServer = app.getHttpServer()
  })

  describe('/weather (GET)', () => {
    it('with no query', async () => {
      request(httpServer)
        .get('/weather')
        .set(HEADER_API_KEY, API_KEY)
        .expect(400)
    })

    it('with location="new york"', async () => {
      const response = await request(httpServer)
        .get('/weather')
        .set(HEADER_API_KEY, API_KEY)
        .query({ location: 'new york' })

      expect(response.statusCode).toEqual(200)

      expect(response.body).toEqual(
        expect.objectContaining({
          latitude: expect.any(String),
          longitude: expect.any(String),
          periods: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              temperature: expect.any(String),
              windSpeed: expect.any(String),
              windDirection: expect.any(String),
              icon: expect.any(String),
              shortDescription: expect.any(String),
            }),
          ]),
        }),
      )
    })
  })

  describe('/current-weather GET', () => {
    it('without location', async () => {
      return request(httpServer)
        .get('/current-weather')
        .set(HEADER_API_KEY, API_KEY)
        .expect(400)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
