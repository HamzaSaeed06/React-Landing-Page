import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PRODUCT_NAME } from '../brand'
import { useAuth } from '../hooks/useAuth'
import {
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from '../auth/validators'

export function SignupPage() {
  const id = useId()
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(null)

  const nameErr = validateName(name)
  const emailErr = validateEmail(email)
  const pwdErr = validatePassword(password)
  const confirmErr = validateConfirm(password, confirm)

  function submit(e) {
    e.preventDefault()
    setTouched(true)
    setError(null)
    if (nameErr || emailErr || pwdErr || confirmErr) return
    try {
      signup({ name, email, password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.')
    }
  }

  return (
    <>
      <h1 className="auth-title">Sign up</h1>
      <p className="auth-lead">
        Create your <strong>{PRODUCT_NAME}</strong> account. Data stays in this
        browser for this demo.
      </p>

      <form className="auth-form" onSubmit={submit} noValidate>
        {error && (
          <p className="form-error form-error--banner" role="alert">
            {error}
          </p>
        )}
        <div className="field">
          <label htmlFor={`${id}-name`}>Full name</label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && nameErr ? 'true' : 'false'}
          />
          {touched && nameErr && <p className="form-error">{nameErr}</p>}
        </div>
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
          {touched && emailErr && <p className="form-error">{emailErr}</p>}
        </div>
        <div className="field">
          <label htmlFor={`${id}-pw`}>Password</label>
          <input
            id={`${id}-pw`}
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && pwdErr ? 'true' : 'false'}
          />
          {touched && pwdErr && <p className="form-error">{pwdErr}</p>}
          <p className="field-hint">8+ chars, one letter, one number.</p>
        </div>
        <div className="field">
          <label htmlFor={`${id}-pw2`}>Confirm password</label>
          <input
            id={`${id}-pw2`}
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && confirmErr ? 'true' : 'false'}
          />
          {touched && confirmErr && (
            <p className="form-error">{confirmErr}</p>
          )}
        </div>
        <button type="submit" className="btn btn--primary btn--block">
          Create account
        </button>
      </form>

      <p className="auth-switch">
        Already have one? <Link to="/login">Log in</Link>
      </p>
    </>
  )
}
