import { Link, NavLink, Outlet } from 'react-router-dom'
import { PRODUCT_NAME } from '../brand'
import { useAuth } from '../hooks/useAuth'

const navCls = ({ isActive }) =>
  `app-nav__link${isActive ? ' app-nav__link--active' : ''}`

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/dashboard" className="app-logo">
            {PRODUCT_NAME}
          </Link>
          <nav className="app-nav" aria-label="Main">
            <NavLink to="/dashboard" className={navCls} end>
              Dashboard
            </NavLink>
          </nav>
          <div className="app-user">
            <span className="app-user__name" title={user.email}>
              {user.name}
            </span>
            <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
