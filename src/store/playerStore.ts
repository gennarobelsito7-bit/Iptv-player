import { create } from 'zustand'
import { Channel, PlayerState } from '../types'

interface PlayerStore extends PlayerState {
  setCurrentChannel: (channel: Channel) => void
  setPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  setFullscreen: (fullscreen: boolean) => void
  reset: () => void
}

const initialState: PlayerState = {
  isPlaying: false,
  currentChannel: undefined,
  currentTime: 0,
  duration: 0,
  volume: 1,
  fullscreen: false,
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  ...initialState,
  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setFullscreen: (fullscreen) => set({ fullscreen }),
  reset: () => set(initialState),
}))