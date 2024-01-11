import {
  Controller,
  Get,
  HttpCode,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { WeathergovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'
import { OpenweatherService } from './openweather/openweather.service'
import {
  WeatherForecastResponse,
  CurrentWeatherResponse,
  OpenweatherResponse,
} from './common/types'

@Controller()
export class AppController {
  constructor(
    private readonly weatherGovService: WeathergovService,
    private readonly openStreetMapService: OpenstreetmapService,
    private readonly openWeatherService: OpenweatherService,
  ) {}

  @HttpCode(200)
  @Get('weather')
  async getForecastWeather(
    @Query('location') location: string,
  ): Promise<WeatherForecastResponse> {
    if (!location) {
      throw new BadRequestException()
    }
    const { latitude, longitude } =
      await this.openStreetMapService.getCoordinates(location)

    const response: WeatherForecastResponse =
      await this.weatherGovService.getForecast(latitude, longitude)
    return response
  }

  @Get('current-weather')
  async getCurrentWeather(
    @Query('location') location: string,
  ): Promise<CurrentWeatherResponse> {
    if (!location) {
      throw new BadRequestException()
    }
    const { latitude, longitude } =
      await this.openStreetMapService.getCoordinates(location)

    const openWeatherResponse: OpenweatherResponse =
      await this.openWeatherService.getCurrentWeather(latitude, longitude)
    const {
      main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
      visibility,
      weather,
    } = openWeatherResponse

    const response: CurrentWeatherResponse = {
      feels_like,
      humidity,
      pressure,
      temp,
      temp_max,
      temp_min,
      visibility,
      weather,
    }

    return response
  }
}
