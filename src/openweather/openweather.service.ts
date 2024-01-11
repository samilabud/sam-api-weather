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
        `weather?lat=${lat}&lon=${lon}&appid=de5c628cb3e798af337d6e9bd3273180`,
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
