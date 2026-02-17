import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, XtreamCredentials } from '../types'

interface AuthStore extends AuthState {
  setXtreamAuth: (credentials: XtreamCredentials) => void
  setM3UAuth: (url: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      type: 'none',
      xtreamCredentials: undefined,
      m3uUrl: undefined,
      setXtreamAuth: (credentials) =>
        set({
          type: 'xtream',
          xtreamCredentials: credentials,
        }),
      setM3UAuth: (url) =>
        set({
          type: 'm3u',
          m3uUrl: url,
        }),
      logout: () =>
        set({
          type: 'none',
          xtreamCredentials: undefined,
          m3uUrl: undefined,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
)