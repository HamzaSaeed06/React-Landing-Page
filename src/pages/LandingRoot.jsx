import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PublicLandingPage } from './PublicLandingPage'

/** Logged-in users skip marketing; guests see the internet-style landing. */
export function LandingRoot() {
  const { user } = useAuth()
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  return <PublicLandingPage />
}
