import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function NotFoundPage() {
  const { user } = useAuth()

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--plain">
        <h1 className="auth-title">Page not found</h1>
        <p className="auth-lead">That URL doesn’t exist in this app.</p>
        <Link
          className="btn btn--primary btn--block"
          to={user ? '/dashboard' : '/login'}
        >
          {user ? 'Go to dashboard' : 'Go to login'}
        </Link>
      </div>
    </div>
  )
}
