import { Channel } from '../types'

export interface M3UItem {
  duration: number
  attributes: Record<string, string>
  name: string
  url: string
}

export class M3UParser {
  static async parseUrl(url: string): Promise<Channel[]> {
    try {
      const response = await fetch(url)
      const text = await response.text()
      return this.parse(text)
    } catch (error) {
      console.error('Error fetching M3U file:', error)
      return []
    }
  }

  static parse(content: string): Channel[] {
    const lines = content.split('\n').filter((line) => line.trim())
    const channels: Channel[] = []
    let currentInfo: Partial<Channel> = {}

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (line.startsWith('#EXTINF:')) {
        currentInfo = this.parseExtinf(line)
      } else if (line && !line.startsWith('#')) {
        if (currentInfo.name) {
          channels.push({
            id: `${channels.length}`,
            name: currentInfo.name,
            logo: currentInfo.logo,
            url: line,
            group: currentInfo.group,
            type: 'live',
          })
        }
        currentInfo = {}
      }
    }

    return channels
  }

  private static parseExtinf(line: string): Partial<Channel> {
    const result: Partial<Channel> = {}

    // Extract duration and attributes
    const match = line.match(/#EXTINF:(-?\d+)\s*,(.*)$/)
    if (match) {
      result.name = match[2].trim()
    }

    // Extract attributes
    const tvgLogoMatch = line.match(/tvg-logo="([^"]*)"/i)
    if (tvgLogoMatch) {
      result.logo = tvgLogoMatch[1]
    }

    const groupMatch = line.match(/group-title="([^"]*)"/i)
    if (groupMatch) {
      result.group = groupMatch[1]
    }

    return result
  }
}