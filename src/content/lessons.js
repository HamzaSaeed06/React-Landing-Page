import { MODULE_IDS } from '../data/moduleIds'

/**
 * Lesson content per module id — scenarios + mixed blocks (not generic textbook tone).
 */
const lessons = {
  intro: {
    scenario:
      'Picture shipping a new internal tool: first milestone is a running React app with sane defaults and fast refresh.',
    sections: [
      {
        h: 'Why teams pick React here',
        p: 'Declarative UI means you describe what should be on screen; the runtime reconciles changes. That scales from a single widget to a full console.',
        callout:
          'This workspace itself is a Vite app — check `package.json` scripts when you’re curious.',
      },
      {
        h: 'Scaffold in minutes',
        bullets: [
          '`npm create vite@latest` → choose React, pick JS or TS.',
          'Install deps, run `npm run dev` — edits hot-reload without losing component state when possible.',
          'Keep `src/` flat at first; split folders when files grow.',
        ],
      },
      {
        h: 'Before you write features',
        p: 'Agree on entry (`main.jsx`), root component, and where global styles live. Naming components `PascalCase` and files to match saves reviews later.',
      },
    ],
  },
  components: {
    scenario:
      'You’re building a design-system-style row: status chips, avatars, labels — all from small pieces, not one mega file.',
    sections: [
      {
        h: 'Props as your public API',
        p: 'Callers pass data in; the component decides how it looks. Keep props few and well-named — that’s how shared UI stays stable across teams.',
      },
      {
        h: 'JSX is just data',
        p: 'Nesting components reads like HTML but compiles to function calls. `children` lets wrappers compose without knowing inner details.',
        callout:
          'The sandbox below passes different labels into one `Badge` — same component, different output.',
      },
      {
        h: 'When to split',
        bullets: [
          'File passes ~150 lines and does two jobs → split.',
          'Repeated markup with tiny differences → extract + props.',
          'Third-party look → wrap in your own component for one place to tweak.',
        ],
      },
    ],
  },
  'state-forms': {
    scenario:
      'A settings form: every field must stay in sync with validation rules and submit payload — controlled inputs are the default pattern.',
    sections: [
      {
        h: 'Local state first',
        p: '`useState` is enough for field values until multiple siblings need the same data — then lift state to their closest shared parent.',
      },
      {
        h: 'Wire events deliberately',
        p: 'Use `onChange` / `onBlur` for text; `onSubmit` on the form for accessibility (Enter key submits). Debounce only when needed (search-as-you-type).',
      },
      {
        h: 'Controlled vs uncontrolled',
        p: 'Controlled: React owns `value`. Uncontrolled: ref + read on submit — fine for rare cases, but harder for instant validation UX.',
        callout:
          'Try the demo: the label updates from state — that’s the pattern behind every serious form library.',
      },
    ],
  },
  depth: {
    scenario:
      'Production bugs often come from unclear ownership: who updates what, and when. Structure beats clever one-liners.',
    sections: [
      {
        h: 'Render vs commit',
        p: 'React may render more often than you think (Strict Mode doubles in dev). Side effects belong in effects or event handlers — not directly in render bodies.',
      },
      {
        h: 'Lists and keys',
        p: 'Stable keys (ids, not array index when order changes) keep state attached to the right row — critical for tables and drag-and-drop.',
      },
      {
        h: 'Reuse without spaghetti',
        bullets: [
          'Colocate state with the component that needs it.',
          'Avoid prop drilling more than two levels — context or composition next.',
          'Document “container vs presentational” in code reviews, not only in slides.',
        ],
      },
    ],
  },
  effects: {
    scenario:
      'Dashboard loads stats from an API: request must cancel when the user switches date range so you never apply stale data.',
    sections: [
      {
        h: 'Effect = sync with outside world',
        p: 'Subscriptions, timers, manual DOM, and network calls fit here. The dependency list is a contract: when it changes, re-run and clean up the old run.',
      },
      {
        h: 'Fetch pattern',
        bullets: [
          'Set loading → fetch with `AbortController` → parse JSON → set data or error.',
          'On unmount or dep change, abort in cleanup.',
          'Show skeletons or inline errors — silent failure confuses users.',
        ],
      },
      {
        h: 'Try the live request',
        p: 'The demo hits a public endpoint; in your app you’d swap the URL and map fields to your table component.',
        callout: 'If the request fails (network/offline), you’ll see an error line — handle that in real UIs too.',
      },
    ],
  },
  advanced: {
    scenario:
      'Checkout has multiple steps with shared rules: custom hooks encapsulate validation; `useReducer` keeps step transitions explicit.',
    sections: [
      {
        h: 'Custom hooks',
        p: 'Prefix `use`, call other hooks inside, return values and callbacks. Share logic, not state — each component that calls the hook gets its own state bag.',
      },
      {
        h: 'Refs for escape hatches',
        p: 'Measure DOM nodes, focus inputs imperatively, or hold mutable values that shouldn’t trigger re-renders (latest handler in an interval).',
      },
      {
        h: 'Reducer for multi-action flows',
        p: 'When the next state depends on the previous and many actions exist, `dispatch` keeps updates auditable — great for wizards and complex forms.',
        callout:
          'The counter demo is tiny on purpose; imagine the same `dispatch` idea across five form steps.',
      },
    ],
  },
  class: {
    scenario:
      'You joined a codebase from 2018: some routes still use class components. You won’t rewrite them overnight — you learn to navigate and wrap.',
    sections: [
      {
        h: 'Lifecycle map (mental)',
        p: '`componentDidMount` ≈ effect with `[]`. `componentDidUpdate` ≈ effect with deps. `componentWillUnmount` ≈ cleanup. Read-only for migration planning.',
      },
      {
        h: 'Error boundaries',
        p: 'Only class `componentDidCatch` (or the modern `react-error-boundary` package) catches render errors in children — use near route or feature boundaries.',
      },
      {
        h: 'Practical approach',
        bullets: [
          'New features: hooks + function components.',
          'Touch a class file: add tests, then refactor in small PRs.',
          'Leave untouched code that works — risk vs reward.',
        ],
      },
    ],
  },
  spa: {
    scenario:
      'Users expect URLs to mean something: `/reports/2025` should load without a full white flash — that’s client routing’s job.',
    sections: [
      {
        h: 'Router maps URL → UI',
        p: 'Nested routes share layout (nav, shell); leaf routes swap the main pane. Bookmarkable and shareable — unlike tab state alone.',
      },
      {
        h: 'Guards at the edge',
        p: 'Auth checks belong on routes: anonymous users see login; after login, `Navigate` them to the intended screen. You’re using that flow in this app.',
        callout:
          'Open DevTools → Network: navigating between `/dashboard` and `/learn/...` doesn’t reload the whole HTML document.',
      },
      {
        h: 'When not to SPA everything',
        p: 'Marketing pages that need SEO and instant first paint sometimes stay server-rendered or static; dashboards and tools are where SPAs shine.',
      },
    ],
  },
}

export function getLesson(topicId) {
  if (!MODULE_IDS.includes(topicId)) return null
  return lessons[topicId] || null
}
