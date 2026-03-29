import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getLesson } from '../content/lessons'
import { isValidTopicId } from '../data/moduleIds'
import { useCurriculum } from '../hooks/useCurriculum'
import { PropsDemo } from '../components/demos/PropsDemo'
import { StateFormDemo } from '../components/demos/StateFormDemo'
import { EffectDemo } from '../components/demos/EffectDemo'
import { ReducerDemo } from '../components/demos/ReducerDemo'

const DEMOS = {
  components: PropsDemo,
  'state-forms': StateFormDemo,
  effects: EffectDemo,
  advanced: ReducerDemo,
}

function LessonSection({ block }) {
  return (
    <section className="lesson-section">
      <h2>{block.h}</h2>
      {block.p && <p className="lesson-section__p">{block.p}</p>}
      {block.bullets && (
        <ul className="lesson-list">
          {block.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      {block.callout && (
        <aside className="lesson-callout" role="note">
          {block.callout}
        </aside>
      )}
    </section>
  )
}

export function TopicLessonPage() {
  const { topicId } = useParams()
  const { markTopicComplete, isTopicDone } = useAuth()
  const { data } = useCurriculum()

  if (!isValidTopicId(topicId)) {
    return <Navigate to="/dashboard" replace />
  }

  const lesson = getLesson(topicId)
  if (!lesson) {
    return <Navigate to="/dashboard" replace />
  }

  const meta = data?.modules?.find((m) => m.id === topicId)
  const Done = DEMOS[topicId]
  const complete = isTopicDone(topicId)

  return (
    <article className="page-lesson">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span aria-hidden="true"> / </span>
        <span>{meta?.title ?? topicId}</span>
      </nav>

      <header className="lesson-head">
        <h1 className="page-title">{meta?.title}</h1>
        {meta?.summary && <p className="page-lead">{meta.summary}</p>}
      </header>

      {lesson.scenario && (
        <p className="lesson-scenario">{lesson.scenario}</p>
      )}

      <div className="lesson-body">
        {lesson.sections.map((block) => (
          <LessonSection key={block.h} block={block} />
        ))}

        {Done && (
          <section className="lesson-section lesson-section--demo">
            <h2>Interactive sandbox</h2>
            <p className="lesson-section__p lesson-section__p--muted">
              Hands-on snippet tied to this module — not graded, just for muscle
              memory.
            </p>
            <Done />
          </section>
        )}

        <div className="lesson-actions">
          {complete ? (
            <p className="muted">Marked complete — you can still review anytime.</p>
          ) : (
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => markTopicComplete(topicId)}
            >
              Mark module done
            </button>
          )}
          <Link to="/dashboard" className="btn btn--ghost">
            Back to workspace
          </Link>
        </div>
      </div>
    </article>
  )
}
