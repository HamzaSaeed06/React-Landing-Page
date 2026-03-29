import { useEffect, useState } from 'react'

export function EffectDemo() {
  const [fact, setFact] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        const res = await fetch('https://catfact.ninja/fact', {
          signal: ac.signal,
        })
        if (!res.ok) throw new Error(String(res.status))
        const json = await res.json()
        setFact(json.fact)
      } catch (e) {
        if (e.name === 'AbortError') return
        setErr('Could not load a fact.')
      } finally {
        setLoading(false)
      }
    })()
    return () => ac.abort()
  }, [])

  return (
    <div className="demo-box">
      {loading && <p className="demo-muted">Loading via useEffect…</p>}
      {err && <p className="demo-error">{err}</p>}
      {fact && <p className="demo-out">{fact}</p>}
    </div>
  )
}
