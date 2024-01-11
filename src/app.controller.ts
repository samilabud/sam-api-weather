import {
  Controller,
  Get,
  HttpCode,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { WeathergovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'
import { WeatherForecastResponse } from './common/types'

@Controller()
export class AppController {
  constructor(
    private readonly weatherGovService: WeathergovService,
    private readonly openStreetMapService: OpenstreetmapService,
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
}
