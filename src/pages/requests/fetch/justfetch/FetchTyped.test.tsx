import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FetchTyped from './FetchTyped.tsx';

describe('FetchTyped', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders items after successful typed fetch', async () => {
    const mockData = { destinations: [{ name: 'Europa', description: 'Icy moon of Jupiter' }] };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    render(<FetchTyped />);

    expect(await screen.findByText('Europa')).toBeInTheDocument();
    expect(await screen.findByText(/Icy moon of Jupiter/)).toBeInTheDocument();
  });

  it('shows error message on failed typed fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as unknown as Response);

    render(<FetchTyped />);
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
  });
});