import { useState } from 'react';

export default function ConditionalBasics() {
  const [show, setShow] = useState(true);
  const [role, setRole] = useState<'guest' | 'admin'>('guest');

  return (
    <div style={{ padding: 16 }}>
      <h2>Conditional Rendering</h2>
      <p>Render different UI based on state and conditions.</p>

      <section>
        <button onClick={() => setShow((s) => !s)}>
          {show ? 'Hide' : 'Show'} Panel
        </button>
        {show && (
          <div style={{ marginTop: 8, border: '1px solid #ccc', padding: 8 }}>
            This panel is conditionally rendered.
          </div>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value as 'guest' | 'admin')}>
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <p style={{ marginTop: 8 }}>
          {role === 'admin' ? 'Welcome, admin.' : 'Hello, guest.'}
        </p>
      </section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}