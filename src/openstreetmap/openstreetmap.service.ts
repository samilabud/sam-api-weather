import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { GeoCoordinates } from '../common/types'

@Injectable()
export class OpenstreetmapService {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://nominatim.openstreetmap.org',
    })
  }

  async getCoordinates(location: string): Promise<GeoCoordinates> {
    const response = await this.httpClient.get('/search', {
      params: { q: location, format: 'json' },
    })

    if (!response.data) {
      return undefined
    }
    return {
      latitude: response.data[0]?.lat,
      longitude: response.data[0]?.lon,
    }
  }
}
