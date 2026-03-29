const EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function validateName(value) {
  const v = value.trim()
  if (!v) return 'Name is required.'
  if (v.length < 2) return 'Name must be at least 2 characters.'
  if (v.length > 80) return 'Name is too long.'
  return null
}

export function validateEmail(value) {
  const v = value.trim().toLowerCase()
  if (!v) return 'Email is required.'
  if (v.length > 254) return 'Email is too long.'
  if (!EMAIL.test(v)) return 'Enter a valid email address.'
  return null
}

export function validatePassword(value) {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Za-z]/.test(value)) return 'Include at least one letter.'
  if (!/\d/.test(value)) return 'Include at least one number.'
  return null
}

export function validateConfirm(password, confirm) {
  if (!confirm) return 'Confirm your password.'
  if (password !== confirm) return 'Passwords do not match.'
  return null
}
