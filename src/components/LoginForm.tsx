import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { XtreamCredentials } from '../types'
import { Eye, EyeOff } from 'lucide-react'

export const LoginForm: React.FC = () => {
  const setXtreamAuth = useAuthStore((state) => state.setXtreamAuth)
  const setM3UAuth = useAuthStore((state) => state.setM3UAuth)

  const [xtreamForm, setXtreamForm] = useState({
    username: '',
    password: '',
    serverUrl: '',
  })

  const [m3uUrl, setM3uUrl] = useState('')
  const [activeTab, setActiveTab] = useState<'xtream' | 'm3u'>('xtream')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleXtreamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validation
      if (!xtreamForm.username || !xtreamForm.password || !xtreamForm.serverUrl) {
        throw new Error('Compila tutti i campi')
      }

      const credentials: XtreamCredentials = {
        username: xtreamForm.username,
        password: xtreamForm.password,
        serverUrl: xtreamForm.serverUrl,
      }

      setXtreamAuth(credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l'accesso')
    } finally {
      setLoading(false)
    }
  }

  const handleM3USubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (!m3uUrl) {
        throw new Error('Inserisci l'URL del file M3U')
      }

      new URL(m3uUrl) // Validate URL
      setM3UAuth(m3uUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'URL non valido')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">IPTV Player</h1>
          <p className="text-gray-400">Accedi al tuo servizio streaming</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-6 bg-primary rounded-lg overflow-hidden">
          <button
            onClick={() => {
              setActiveTab('xtream')
              setError('')
            }}
            className={`flex-1 py-3 font-semibold transition ${
              activeTab === 'xtream'
                ? 'bg-accent text-white'
                : 'bg-primary text-gray-300 hover:text-white'
            }`}
          >
            Xtream Codes
          </button>
          <button
            onClick={() => {
              setActiveTab('m3u')
              setError('')
            }}
            className={`flex-1 py-3 font-semibold transition ${
              activeTab === 'm3u'
                ? 'bg-accent text-white'
                : 'bg-primary text-gray-300 hover:text-white'
            }`}
          >
            M3U
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Xtream Codes Form */}
        {activeTab === 'xtream' && (
          <form onSubmit={handleXtreamSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Server URL
              </label>
              <input
                type="url"
                placeholder="https://example.com:8080"
                value={xtreamForm.serverUrl}
                onChange={(e) =>
                  setXtreamForm({ ...xtreamForm, serverUrl: e.target.value })
                }
                className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Il tuo username"
                value={xtreamForm.username}
                onChange={(e) =>
                  setXtreamForm({ ...xtreamForm, username: e.target.value })
                }
                className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="La tua password"
                  value={xtreamForm.password}
                  onChange={(e) =>
                    setXtreamForm({ ...xtreamForm, password: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-accent hover:bg-red-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connessione...' : 'Accedi'}
            </button>
          </form>
        )}

        {/* M3U Form */}
        {activeTab === 'm3u' && (
          <form onSubmit={handleM3USubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL File M3U
              </label>
              <input
                type="url"
                placeholder="https://example.com/playlist.m3u"
                value={m3uUrl}
                onChange={(e) => setM3uUrl(e.target.value)}
                className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Incolla l'URL della tua playlist M3U
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-accent hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              Carica Playlist
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Le tue credenziali sono memorizzate solo localmente
        </p>
      </div>
    </div>
  )
}