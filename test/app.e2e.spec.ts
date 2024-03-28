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

    it('with location=miami', async () => {
      const response = await request(httpServer)
        .get('/current-weather')
        .set(HEADER_API_KEY, API_KEY)
        .query({ location: 'miami' })
      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          feels_like: expect.any(Number),
          humidity: expect.any(Number),
          pressure: expect.any(Number),
          temp: expect.any(Number),
          temp_max: expect.any(Number),
          temp_min: expect.any(Number),
          visibility: expect.any(Number),
          weather: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              main: expect.any(String),
              description: expect.any(String),
              icon: expect.any(String),
            }),
          ]),
        }),
      )
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
