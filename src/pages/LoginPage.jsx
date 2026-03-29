import { useId, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PRODUCT_NAME } from '../brand'
import { useAuth } from '../hooks/useAuth'
import { validateEmail } from '../auth/validators'

export function LoginPage() {
  const id = useId()
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(null)

  const emailErr = validateEmail(email)
  const pwdErr =
    !password ? 'Password is required.' : null
  const from = location.state?.from

  function submit(e) {
    e.preventDefault()
    setTouched(true)
    setError(null)
    if (emailErr || pwdErr) return
    try {
      login(email, password)
      navigate(from && from !== '/login' ? from : '/dashboard', {
        replace: true,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    }
  }

  return (
    <>
      <h1 className="auth-title">Log in</h1>
      <p className="auth-lead">
        Sign in to your <strong>{PRODUCT_NAME}</strong> workspace.
      </p>

      <form className="auth-form" onSubmit={submit} noValidate>
        {error && (
          <p className="form-error form-error--banner" role="alert">
            {error}
          </p>
        )}
        <div className="field">
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && emailErr ? 'true' : 'false'}
          />
          {touched && emailErr && (
            <p className="form-error">{emailErr}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor={`${id}-pw`}>Password</label>
          <input
            id={`${id}-pw`}
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && pwdErr ? 'true' : 'false'}
          />
          {touched && pwdErr && <p className="form-error">{pwdErr}</p>}
        </div>
        <button type="submit" className="btn btn--primary btn--block">
          Continue
        </button>
      </form>

      <p className="auth-switch">
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  )
}
