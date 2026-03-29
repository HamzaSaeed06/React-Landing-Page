/**
 * Demo auth persistence only — not for production secrets.
 * Passwords are stored in plain text in localStorage for learning purposes.
 */

const USERS_KEY = 'rj-v1-users'
const SESSION_KEY = 'rj-v1-session'
const PROGRESS_KEY = 'rj-v1-progress'

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser({ name, email, password }) {
  const users = getUsers()
  const norm = email.trim().toLowerCase()
  if (users.some((u) => u.email === norm)) {
    throw new Error('This email is already registered.')
  }
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: norm,
    password,
    createdAt: Date.now(),
  }
  users.push(user)
  persistUsers(users)
  return { id: user.id, name: user.name, email: user.email }
}

export function authenticate(email, password) {
  const norm = email.trim().toLowerCase()
  const users = getUsers()
  const user = users.find((u) => u.email === norm && u.password === password)
  if (!user) {
    throw new Error('Invalid email or password.')
  }
  return { id: user.id, name: user.name, email: user.email }
}

export function setSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      userId: user.id,
      name: user.name,
      email: user.email,
    }),
  )
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const s = JSON.parse(raw)
    if (!s?.email || !s?.userId) return null
    return {
      id: s.userId,
      name: s.name,
      email: s.email,
    }
  } catch {
    return null
  }
}

export function getProgress(email) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
    const key = email.toLowerCase()
    const row = all[key]
    const completed = Array.isArray(row?.completed) ? row.completed : []
    return { completed: [...new Set(completed)] }
  } catch {
    return { completed: [] }
  }
}

export function addCompletedTopic(email, topicId) {
  const key = email.toLowerCase()
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
    const row = all[key] || { completed: [] }
    const completed = new Set(row.completed || [])
    completed.add(topicId)
    all[key] = { completed: [...completed] }
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all))
  } catch {
    /* ignore */
  }
}
