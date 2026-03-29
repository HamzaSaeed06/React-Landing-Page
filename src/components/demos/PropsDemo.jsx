function Badge({ label, tone = 'default' }) {
  return <span className={`demo-badge demo-badge--${tone}`}>{label}</span>
}

export function PropsDemo() {
  return (
    <div className="demo-box">
      <Badge label="Tooling" tone="blue" />
      <Badge label="JSX primer" tone="violet" />
      <Badge label="Props" />
    </div>
  )
}
