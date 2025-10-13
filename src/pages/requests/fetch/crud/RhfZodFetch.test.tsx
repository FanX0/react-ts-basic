import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RhfZodFetch from './RhfZodFetch.tsx';

const items = [
  { id: 1, name: 'Moon', description: "Earth's natural satellite" },
  { id: 2, name: 'Mars', description: 'The red planet' },
];
const refreshSpy = vi.fn();
const createSpy = vi.fn();

vi.mock('../../../../hooks/useDestinationsCrud', () => ({
  useDestinationsCrud: () => ({
    items,
    loading: false,
    error: null,
    refresh: refreshSpy,
    create: createSpy,
  }),
}));

describe('RhfZodFetch', () => {
  it('renders items and submits create via hook with zod resolver', async () => {

    render(<RhfZodFetch />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(items[1]).toHaveTextContent('Mars');

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => expect(createSpy).toHaveBeenCalledWith({ name: 'Europa', description: 'Icy moon of Jupiter' }));

    fireEvent.click(screen.getByText('Refresh'));
    expect(refreshSpy).toHaveBeenCalled();
  });
});