import { useEffect, useState } from 'react'

const CACHE_KEY = 'curriculum-cache-v1'
const STALE_MS = 1000 * 60 * 5

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      typeof parsed.fetchedAt === 'number' &&
      Date.now() - parsed.fetchedAt < STALE_MS
    ) {
      return parsed.payload
    }
  } catch {
    sessionStorage.removeItem(CACHE_KEY)
  }
  return null
}

function writeCache(payload) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), payload }),
    )
  } catch {
    /* ignore quota */
  }
}

/**
 * Demonstrates Effects + data fetching with cache, abort, and error UI states.
 */
export function useCurriculum() {
  const [state, setState] = useState(() => {
    const cached = typeof window !== 'undefined' ? readCache() : null
    return {
      data: cached,
      loading: !cached,
      error: null,
    }
  })

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setState({ data: cached, loading: false, error: null })
      return undefined
    }

    const controller = new AbortController()
    const tid = window.setTimeout(() => {
      ;(async () => {
        try {
          const res = await fetch('/data/curriculum.json', {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          })
          if (!res.ok) {
            throw new Error(`Failed to load curriculum (${res.status})`)
          }
          const json = await res.json()
          writeCache(json)
          setState({ data: json, loading: false, error: null })
        } catch (e) {
          if (e.name === 'AbortError') return
          setState((s) => ({
            ...s,
            loading: false,
            error: e instanceof Error ? e.message : 'Unknown error',
          }))
        }
      })()
    }, 0)

    return () => {
      window.clearTimeout(tid)
      controller.abort()
    }
  }, [])

  return state
}
