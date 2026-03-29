import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import {
  addCompletedTopic,
  authenticate,
  clearSession,
  getProgress,
  readSession,
  registerUser,
  setSession,
} from '../auth/storage'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())
  const [progress, setProgress] = useState(() => {
    const s = readSession()
    return s ? getProgress(s.email) : { completed: [] }
  })

  const login = useCallback((email, password) => {
    const u = authenticate(email, password)
    setSession(u)
    setUser(u)
    setProgress(getProgress(u.email))
    return u
  }, [])

  const signup = useCallback((payload) => {
    const u = registerUser(payload)
    setSession(u)
    setUser(u)
    setProgress(getProgress(u.email))
    return u
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
    setProgress({ completed: [] })
  }, [])

  const markTopicComplete = useCallback(
    (topicId) => {
      if (!user) return
      addCompletedTopic(user.email, topicId)
      setProgress(getProgress(user.email))
    },
    [user],
  )

  const isTopicDone = useCallback(
    (topicId) => progress.completed.includes(topicId),
    [progress.completed],
  )

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
      progress,
      markTopicComplete,
      isTopicDone,
    }),
    [user, login, signup, logout, progress, markTopicComplete, isTopicDone],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
