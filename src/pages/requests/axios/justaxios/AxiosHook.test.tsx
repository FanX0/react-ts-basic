import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AxiosHook from '@/pages/requests/axios/justaxios/AxiosHook';

vi.mock('@/hooks/useAxios', () => {
  return {
    useAxios: () => ({
      data: { destinations: [{ name: 'Mercury', description: 'Closest planet to the Sun' }] },
      loading: false,
      error: null,
      refetch: vi.fn(),
    }),
  };
});

describe('AxiosHook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders items from the hook and shows refetch button', async () => {
    render(<AxiosHook />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Mercury');
    expect(items[0]).toHaveTextContent('Closest planet to the Sun');

    expect(screen.getByText('Refetch')).toBeInTheDocument();
  });
});