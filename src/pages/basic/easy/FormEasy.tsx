import { useState } from 'react';

export default function FormBasics() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 1 && /.+@.+\..+/.test(email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Form Basics</h2>
      <p>Controlled inputs for reliable form state.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 8 }}>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada"
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ada@example.com"
              type="email"
            />
          </label>
        </div>
        <button type="submit" disabled={!isValid}>Submit</button>
      </form>

      {submitted && (
        <p style={{ marginTop: 8 }}>
          Submitted: {name} ({email})
        </p>
      )}

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}