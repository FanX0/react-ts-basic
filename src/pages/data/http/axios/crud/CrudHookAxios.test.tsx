import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CrudHookAxios from '@/pages/data/http/axios/crud/CrudHookAxios';

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

describe('CrudHookAxios (Axios Hook)', () => {
  it('renders items and triggers hook actions via UI', async () => {

    render(<CrudHookAxios />);

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Moon');
    expect(listItems[1]).toHaveTextContent('Mars');

    // Create
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => expect(createSpy).toHaveBeenCalledWith({ name: 'Europa', description: 'Icy moon of Jupiter' }));

    // Edit and Update
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    await waitFor(() => expect(updateSpy).toHaveBeenCalled());

    // Delete
    fireEvent.click(screen.getAllByText('Delete')[1]);
    await waitFor(() => expect(removeSpy).toHaveBeenCalledWith(2));

    // Refresh
    fireEvent.click(screen.getByText('Refresh'));
    expect(refreshSpy).toHaveBeenCalled();
  });
});
