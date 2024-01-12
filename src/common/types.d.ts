export interface WeatherForecastResponse {
  periods: Array<WeatherPeriod>
  latitude: string
  longitude: string
}

export type WeatherPeriod = {
  name: string
  temperature: string
  windSpeed: string
  windDirection: string
}

export type GeoCoordinates = {
  latitude: string
  longitude: string
}

export type CurrentWeatherResponse = {
  feels_like: number
  humidity: number
  pressure: number
  temp: number
  temp_max: number
  temp_min: number
  visibility: number
  weather: [
    {
      main: string
      description: string
    },
  ]
}
export interface OpenweatherResponse {
  weather: [
    {
      main: string
      description: string
    },
  ]
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  visibility: number
}
