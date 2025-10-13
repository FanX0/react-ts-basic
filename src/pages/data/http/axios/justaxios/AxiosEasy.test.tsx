import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AxiosEasy from '@/pages/data/http/axios/justaxios/AxiosEasy';

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn().mockResolvedValue({
        data: { destinations: [{ name: 'Mars', description: 'The red planet' }] },
      }),
    },
  };
});

describe('AxiosEasy', () => {
  it('renders items after successful axios request', async () => {
    render(<AxiosEasy />);

    expect(await screen.findByText('Mars')).toBeInTheDocument();
    expect(await screen.findByText(/The red planet/)).toBeInTheDocument();
  });
});