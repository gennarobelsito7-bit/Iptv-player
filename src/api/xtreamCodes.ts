import axios, { AxiosInstance } from 'axios'
import { XtreamCredentials, Channel, Category } from '../types'

export class XtreamCodesAPI {
  private client: AxiosInstance
  private credentials: XtreamCredentials

  constructor(credentials: XtreamCredentials) {
    this.credentials = credentials

    // Normalize server URL
    const serverUrl = credentials.serverUrl.replace(/\/\$/, '')
    
    this.client = axios.create({
      baseURL: serverUrl,
      timeout: 10000,
    })
  }

  private getParams() {
    return {
      username: this.credentials.username,
      password: this.credentials.password,
    }
  }

  async getCategories(type: 'live' | 'vod' = 'live'): Promise<Category[]> {
    try {
      const response = await this.client.get(`/player_api.php`, {
        params: {
          ...this.getParams(),
          action: 'get_categories',
          type,
        },
      })
      return response.data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  async getChannels(categoryId?: string, type: 'live' | 'vod' = 'live'): Promise<Channel[]> {
    try {
      const params: any = {
        ...this.getParams(),
        action: 'get_live_streams',
      }

      if (type === 'vod') {
        params.action = 'get_vod_streams'
      }

      if (categoryId) {
        params.category_id = categoryId
      }

      const response = await this.client.get(`/player_api.php`, { params })
      
      if (!Array.isArray(response.data)) {
        return []
      }

      return response.data.map((ch: any) => ({
        id: ch.stream_id,
        name: ch.name,
        logo: ch.stream_icon || undefined,
        url: this.getStreamUrl(ch.stream_id, type),
        group: ch.category_name || undefined,
        type,
      }))
    } catch (error) {
      console.error('Error fetching channels:', error)
      return []
    }
  }

  private getStreamUrl(streamId: string, type: 'live' | 'vod' = 'live'): string {
    const action = type === 'vod' ? 'get_vod_streams' : 'get_live_streams'
    return `${this.credentials.serverUrl}/streaming/${action}/${this.credentials.username}/${this.credentials.password}/${streamId}`
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get(`/player_api.php`, {
        params: {
          ...this.getParams(),
          action: 'get_categories',
          type: 'live',
        },
      })
      return response.status === 200
    } catch (error) {
      console.error('Connection test failed:', error)
      return false
    }
  }
}