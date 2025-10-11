import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import App from './App.jsx';

describe('App navigation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('renders key navigation links', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [],
    } as unknown as Response);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Fetch Typed')).toBeInTheDocument();
    expect(screen.getByText('Axios Typed')).toBeInTheDocument();
    expect(screen.getByText('CRUD RHF Typed (Fetch)')).toBeInTheDocument();
    expect(screen.getByText('CRUD RHF Typed (Axios)')).toBeInTheDocument();
  });
});