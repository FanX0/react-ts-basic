import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RhfZodAxios from '@/pages/data/http/axios/crud/RhfZodAxios';

const items = [
  { id: 1, name: 'Moon', description: "Earth's natural satellite" },
  { id: 2, name: 'Mars', description: 'The red planet' },
];
const refreshSpy = vi.fn();
const createSpy = vi.fn();

vi.mock('@/hooks/useDestinationsCrudAxios', () => ({
  useDestinationsCrudAxios: () => ({
    items,
    loading: false,
    error: null,
    refresh: refreshSpy,
    create: createSpy,
  }),
}));

describe('RhfZodAxios', () => {
  it('renders items and submits create via axios hook with zod resolver', async () => {
    const hook = { refresh: refreshSpy, create: createSpy };

    render(<RhfZodAxios />);

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Moon');
    expect(listItems[1]).toHaveTextContent('Mars');

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => expect(hook.create).toHaveBeenCalledWith({ name: 'Europa', description: 'Icy moon of Jupiter' }));

    fireEvent.click(screen.getByText('Refresh'));
    expect(hook.refresh).toHaveBeenCalled();
  });
});