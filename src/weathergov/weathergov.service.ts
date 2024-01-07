import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class WeathergovService {
  axioClient: AxiosInstance
  constructor() {
    this.axioClient = axios.create({ baseURL: 'https://api.weather.gov/' })
  }
  async getForecast(latitude: string, longitude: string) {
    const forecastURL = await this.getPoint(latitude, longitude)
    const forecastData = await this.axioClient.get(forecastURL)
    const periods = forecastData.data.properties.periods.map((p) => ({
      name: p.name,
      temperature: p.temperature.toString(),
      windSpeed: p.windSpeed,
      windDirection: p.windDirection,
    }))
    const result = { periods }
    return result
  }

  private async getPoint(latitude: string, longitude: string) {
    const request = await this.axioClient.get(`points/${latitude},${longitude}`)
    return request.data.properties.forecast
  }
}
