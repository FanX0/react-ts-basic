import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FetchEasy from './FetchEasy.tsx';

describe('FetchEasy', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders items after successful fetch', async () => {
    const mockData = { destinations: [{ name: 'Moon', description: "Earth's natural satellite" }] };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    render(<FetchEasy />);

    expect(await screen.findByText('Moon')).toBeInTheDocument();
    expect(await screen.findByText(/Earth's natural satellite/)).toBeInTheDocument();
  });

  it('shows error message on failed fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as unknown as Response);

    render(<FetchEasy />);

    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
  });
});