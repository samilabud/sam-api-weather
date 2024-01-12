import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class OpenweatherService {
  private axioClient: AxiosInstance
  constructor() {
    this.axioClient = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/',
    })
  }

  public async getCurrentWeather(lat: string, lon: string) {
    try {
      const request = await this.axioClient.get(
        `weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      )
      if (!request.data) {
        return null
      }
      return request.data
    } catch (error) {
      return null
    }
  }
}
