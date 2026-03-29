import { useState } from 'react'

export function StateFormDemo() {
  const [name, setName] = useState('')

  return (
    <div className="demo-box demo-box--col">
      <label className="demo-label" htmlFor="demo-name">
        Your name
      </label>
      <input
        id="demo-name"
        className="demo-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type here…"
        autoComplete="off"
      />
      <p className="demo-out">
        {name.trim() ? `Hello, ${name.trim()}!` : 'Controlled input above.'}
      </p>
    </div>
  )
}
