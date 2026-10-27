import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../api'
import { tokenStore } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false) // true after the first "who am I?" check

  useEffect(() => {
    if (!tokenStore.get()) {
      setReady(true)
      return
    }
    api
      .getMe()
      .then(setUser)
      .catch(() => tokenStore.set(null))
      .finally(() => setReady(true))
  }, [])

  const finish = useCallback((res) => {
    tokenStore.set(res.access_token)
    setUser(res.user)
    return res.user
  }, [])

  const login = useCallback(async (data) => finish(await api.login(data)), [finish])
  const register = useCallback(async (data) => finish(await api.register(data)), [finish])
  const logout = useCallback(() => {
    tokenStore.set(null)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, ready, login, register, logout }), [user, ready, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
