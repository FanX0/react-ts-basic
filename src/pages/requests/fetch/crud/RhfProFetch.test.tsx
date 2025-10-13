import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RhfProFetch from '@/pages/requests/fetch/crud/RhfProFetch';

const items = [
  { id: 1, name: 'Moon', description: "Earth's natural satellite" },
  { id: 2, name: 'Mars', description: 'The red planet' },
];
const refreshSpy = vi.fn();
const createSpy = vi.fn();
const updateSpy = vi.fn();
const removeSpy = vi.fn();

vi.mock('@/hooks/useDestinationsCrud', () => ({
  useDestinationsCrud: () => ({
    items,
    loading: false,
    error: null,
    refresh: refreshSpy,
    create: createSpy,
    update: updateSpy,
    remove: removeSpy,
  }),
}));

describe('RhfProFetch', () => {
  it('toggles edit mode and submits update; supports delete and refresh', async () => {
    const hook = { refresh: refreshSpy, create: createSpy, update: updateSpy, remove: removeSpy };

    render(<RhfProFetch />);

    // Items render
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');

    // Enter edit mode and verify Update/Cancel appear
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    // Submit update
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    await waitFor(() => expect(hook.update).toHaveBeenCalled());

    // Delete second item
    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(hook.remove).toHaveBeenCalledWith(2);

    // Refresh button
    fireEvent.click(screen.getByText('Refresh'));
    expect(hook.refresh).toHaveBeenCalled();
  });
});