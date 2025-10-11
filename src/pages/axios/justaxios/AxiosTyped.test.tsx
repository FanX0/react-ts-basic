import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AxiosTyped from './AxiosTyped.tsx';

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn().mockResolvedValue({
        data: { destinations: [{ name: 'Venus', description: 'Second planet from the Sun' }] },
      }),
    },
  };
});

describe('AxiosTyped', () => {
  it('renders items after successful typed axios request', async () => {
    render(<AxiosTyped />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Venus');
    expect(items[0]).toHaveTextContent('Second planet from the Sun');
  });
});