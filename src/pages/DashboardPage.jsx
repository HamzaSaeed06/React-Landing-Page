import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCurriculum } from '../hooks/useCurriculum'
import { PRODUCT_NAME } from '../brand'
import { MODULE_IDS } from '../data/moduleIds'

function firstName(full) {
  const t = full?.trim()
  if (!t) return 'there'
  return t.split(/\s+/)[0]
}

export function DashboardPage() {
  const { user, progress, isTopicDone } = useAuth()
  const { data, loading, error } = useCurriculum()

  const total = MODULE_IDS.length
  const done = progress.completed.length
  const remaining = Math.max(0, total - done)
  const pct = total ? Math.round((done / total) * 100) : 0

  const ordered =
    data?.modules?.length
      ? [...data.modules].sort(
          (a, b) => MODULE_IDS.indexOf(a.id) - MODULE_IDS.indexOf(b.id),
        )
      : []

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__text">
          <p className="dash-hero__eyebrow">{PRODUCT_NAME}</p>
          <h1 className="dash-hero__title">
            Welcome back, {firstName(user.name)}
          </h1>
          <p className="dash-hero__lead">
            Continue your structured path: open each module, work through the
            sandbox where available, and mark items complete — progress is saved
            for your account on this device.
          </p>
        </div>
        <div className="dash-hero__accent" aria-hidden="true" />
      </header>

      <section className="dash-stats" aria-label="Summary statistics">
        <article className="dash-stat">
          <span className="dash-stat__label">Total modules</span>
          <span className="dash-stat__value">{total}</span>
        </article>
        <article className="dash-stat dash-stat--accent">
          <span className="dash-stat__label">Completed</span>
          <span className="dash-stat__value">{done}</span>
        </article>
        <article className="dash-stat">
          <span className="dash-stat__label">Remaining</span>
          <span className="dash-stat__value">{remaining}</span>
        </article>
      </section>

      <section
        className="dash-progress-card"
        aria-labelledby="dash-progress-heading"
      >
        <div className="dash-progress-card__head">
          <div>
            <h2 id="dash-progress-heading" className="dash-progress-card__title">
              Course completion
            </h2>
            <p className="dash-progress-card__sub">
              Your progress is saved in this browser for your account.
            </p>
          </div>
          <div className="dash-progress-card__pct" aria-hidden="true">
            <span className="dash-progress-card__pct-num">{pct}</span>
            <span className="dash-progress-card__pct-sym">%</span>
          </div>
        </div>
        <div className="dash-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${pct} percent complete`}>
          <div className="dash-progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="dash-progress-card__foot">
          <strong>{done}</strong> of <strong>{total}</strong> modules finished
        </p>
      </section>

      <section className="dash-modules" aria-labelledby="modules-heading">
        <div className="dash-modules__head">
          <h2 id="modules-heading" className="dash-modules__title">
            Modules
          </h2>
          <p className="dash-modules__sub">
            Eight sequential units — from first setup through advanced patterns
            and client-side navigation.
          </p>
        </div>

        {loading && (
          <div className="dash-skeleton" aria-busy="true" aria-label="Loading">
            <div className="dash-skeleton__line" />
            <div className="dash-skeleton__line dash-skeleton__line--short" />
            <div className="dash-skeleton__grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="dash-skeleton__card" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="form-error form-error--banner" role="alert">
            {error}
          </p>
        )}

        {!loading && ordered.length > 0 && (
          <ul className="dash-topic-grid">
            {ordered.map((m, index) => {
              const complete = isTopicDone(m.id)
              return (
                <li key={m.id}>
                  <article
                    className={`dash-topic-card ${complete ? 'dash-topic-card--done' : ''}`}
                  >
                    <div className="dash-topic-card__top">
                      <span className="dash-topic-card__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {complete ? (
                        <span className="dash-topic-card__badge">Complete</span>
                      ) : (
                        <span className="dash-topic-card__badge dash-topic-card__badge--muted">
                          Open
                        </span>
                      )}
                    </div>
                    <h3 className="dash-topic-card__title">{m.title}</h3>
                    <p className="dash-topic-card__sum">{m.summary}</p>
                    <div className="dash-topic-card__tags">
                      {m.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="dash-topic-card__foot">
                      <Link
                        className="dash-topic-card__cta"
                        to={`/learn/${m.id}`}
                      >
                        {complete ? 'Review lesson' : 'Start lesson'}
                        <span className="dash-topic-card__cta-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
