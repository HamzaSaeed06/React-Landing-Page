import { Link, Outlet } from 'react-router-dom'
import { PRODUCT_NAME, PRODUCT_TAGLINE } from '../brand'

export function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          {PRODUCT_NAME}
        </Link>
        <p className="auth-tagline">{PRODUCT_TAGLINE}</p>
        <Outlet />
      </div>
    </div>
  )
}
