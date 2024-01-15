import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class WeathergovService {
  axioClient: AxiosInstance
  constructor() {
    this.axioClient = axios.create({ baseURL: 'https://api.weather.gov/' })
  }
  async getForecast(latitude: string, longitude: string) {
    let periods: []
    const forecastURL = await this.getPoint(latitude, longitude)
    if (forecastURL) {
      const forecastData = await this.axioClient.get(forecastURL)
      periods = forecastData.data.properties.periods.map((p) => ({
        name: p.name,
        temperature: p.temperature.toString(),
        windSpeed: p.windSpeed,
        windDirection: p.windDirection,
        icon: p.icon,
        shortDescription: p.shortForecast,
      }))
    } else {
      periods = []
    }
    const result = { latitude, longitude, periods }
    return result
  }

  private async getPoint(latitude: string, longitude: string) {
    try {
      const request = await this.axioClient.get(
        `points/${latitude},${longitude}`,
      )

      if (!request.data) {
        return null
      }
      return request.data.properties.forecast
    } catch (error) {
      return null
    }
  }
}
