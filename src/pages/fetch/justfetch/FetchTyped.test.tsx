import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FetchTyped from './FetchTyped.tsx';

describe('FetchTyped', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders items after successful typed fetch', async () => {
    const mockData = { destinations: [{ name: 'Europa', description: 'Icy moon of Jupiter' }] };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    render(<FetchTyped />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Europa');
    expect(items[0]).toHaveTextContent('Icy moon of Jupiter');
  });

  it('shows error message on failed typed fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as unknown as Response);

    render(<FetchTyped />);
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
  });
});