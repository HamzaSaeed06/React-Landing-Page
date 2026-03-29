import { Link } from 'react-router-dom'
import { PRODUCT_NAME } from '../brand'

/**
 * Minimal landing — same structure as common free single-page templates
 * (nav + hero + 3 highlights + footer). Keeps app routes: login / signup.
 */
export function PublicLandingPage() {
  return (
    <div className="tpl">
      <header className="tpl-top">
        <span className="tpl-brand">{PRODUCT_NAME}</span>
        <nav className="tpl-nav">
          <Link to="/login">Log in</Link>
          <Link to="/signup" className="tpl-btn">
            Sign up
          </Link>
        </nav>
      </header>

      <main className="tpl-main">
        <h1 className="tpl-h1">Welcome.</h1>
        <p className="tpl-lead">
          A clean page. Sign in to open your workspace and modules.
        </p>
        <div className="tpl-actions">
          <Link to="/signup" className="tpl-btn tpl-btn--solid">
            Get started
          </Link>
          <Link to="/login" className="tpl-btn tpl-btn--line">
            Log in
          </Link>
        </div>

        <ul className="tpl-highlights">
          <li>
            <strong>Simple</strong>
            <span>No clutter.</span>
          </li>
          <li>
            <strong>Fast</strong>
            <span>Loads quick.</span>
          </li>
          <li>
            <strong>Yours</strong>
            <span>Progress saved locally.</span>
          </li>
        </ul>
      </main>

      <footer className="tpl-foot">
        <small>© {new Date().getFullYear()} {PRODUCT_NAME}</small>
      </footer>
    </div>
  )
}
