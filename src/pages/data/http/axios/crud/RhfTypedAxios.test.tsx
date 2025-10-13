import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RhfTypedAxios from '@/pages/data/http/axios/crud/RhfTypedAxios';

const items = [
  { id: 1, name: 'Moon', description: "Earth's natural satellite" },
  { id: 2, name: 'Mars', description: 'The red planet' },
];
const refreshSpy = vi.fn();
const createSpy = vi.fn();
const updateSpy = vi.fn();
const removeSpy = vi.fn();

vi.mock('@/hooks/useDestinationsCrudAxios', () => ({
  useDestinationsCrudAxios: () => ({
    items,
    loading: false,
    error: null,
    refresh: refreshSpy,
    create: createSpy,
    update: updateSpy,
    remove: removeSpy,
  }),
}));

describe('RhfTypedAxios', () => {
  it('supports edit mode and calls update on submit; delete and refresh', async () => {
    const hook = { refresh: refreshSpy, create: createSpy, update: updateSpy, remove: removeSpy };

    render(<RhfTypedAxios />);

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Moon');

    // Enter edit mode for first item
    fireEvent.click(screen.getAllByText('Edit')[0]);
    // Update description and submit
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    await waitFor(() => expect(hook.update).toHaveBeenCalled());

    // Delete second item
    fireEvent.click(screen.getAllByText('Delete')[1]);
    await waitFor(() => expect(hook.remove).toHaveBeenCalledWith(2));

    // Refresh button
    fireEvent.click(screen.getByText('Refresh'));
    expect(hook.refresh).toHaveBeenCalled();
  });
});