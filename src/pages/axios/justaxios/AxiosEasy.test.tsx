import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AxiosEasy from './AxiosEasy.tsx';

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

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Mars');
    expect(items[0]).toHaveTextContent('The red planet');
  });
});