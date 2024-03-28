import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { GeoCoordinates } from '../common/types'

const customHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'chrome/1.0',
}

@Injectable()
export class OpenstreetmapService {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      headers: customHeaders,
      baseURL: 'https://nominatim.openstreetmap.org',
    })
  }

  async getCoordinates(location: string): Promise<GeoCoordinates> {
    let response = null
    try {
      response = await this.httpClient.get('/search', {
        params: { q: location, format: 'jsonv2' },
      })
    } catch (error) {
      console.log('getCoordinates', error)
    }

    if (!response.data) {
      console.log('getCoordinates error: not response')
      return undefined
    }
    return {
      latitude: response.data[0]?.lat,
      longitude: response.data[0]?.lon,
    }
  }
}
