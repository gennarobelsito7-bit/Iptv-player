export interface XtreamCredentials {
  username: string
  password: string
  serverUrl: string
}

export interface M3UPlaylist {
  name: string
  url: string
}

export interface Channel {
  id: string
  name: string
  logo?: string
  url: string
  group?: string
  duration?: number
  type?: 'live' | 'vod'
}

export interface Category {
  id: string
  name: string
}

export interface AuthState {
  type: 'none' | 'xtream' | 'm3u'
  xtreamCredentials?: XtreamCredentials
  m3uUrl?: string
}

export interface PlayerState {
  isPlaying: boolean
  currentChannel?: Channel
  currentTime: number
  duration: number
  volume: number
  fullscreen: boolean
}