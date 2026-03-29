import { useReducer } from 'react'

function counterReducer(state, action) {
  switch (action.type) {
    case 'inc':
      return { n: state.n + 1 }
    case 'dec':
      return { n: state.n - 1 }
    case 'reset':
      return { n: 0 }
    default:
      return state
  }
}

export function ReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, { n: 0 })

  return (
    <div className="demo-box demo-box--row">
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => dispatch({ type: 'dec' })}
      >
        −
      </button>
      <span className="demo-count">{state.n}</span>
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => dispatch({ type: 'inc' })}
      >
        +
      </button>
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </button>
    </div>
  )
}
