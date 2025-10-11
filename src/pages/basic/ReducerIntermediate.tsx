import { useReducer } from 'react';

type State = { count: number };
type Action = { type: 'inc' } | { type: 'dec' } | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'dec':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

export default function ReducerIntermediate() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div style={{ padding: 16 }}>
      <h2>Reducer</h2>
      <p>Manage complex state updates with <code>useReducer</code>.</p>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'inc' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'dec' })} style={{ marginLeft: 8 }}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })} style={{ marginLeft: 8 }}>Reset</button>
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}