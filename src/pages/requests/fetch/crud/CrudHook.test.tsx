import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CrudHook from '@/pages/requests/fetch/crud/CrudHook';

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

describe('CrudHook (Fetch)', () => {
  it('renders items and triggers hook actions via UI', async () => {

    render(<CrudHook />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(items[1]).toHaveTextContent('Mars');

    // Create
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    expect(createSpy).toHaveBeenCalledWith({ name: 'Europa', description: 'Icy moon of Jupiter' });

    // Edit and Update
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    expect(updateSpy).toHaveBeenCalled();

    // Delete
    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(removeSpy).toHaveBeenCalledWith(2);

    // Refresh
    fireEvent.click(screen.getByText('Refresh'));
    expect(refreshSpy).toHaveBeenCalled();
  });
});