import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FetchHook from './FetchHook.tsx';

describe('FetchHook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders items and allows refetch', async () => {
    const mockData = { destinations: [{ name: 'Titan', description: 'Largest moon of Saturn' }] };
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    render(<FetchHook />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Titan');
    expect(items[0]).toHaveTextContent('Largest moon of Saturn');

    // Trigger refetch and ensure it calls fetch again
    const btn = screen.getByText('Refetch');
    btn.click();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});