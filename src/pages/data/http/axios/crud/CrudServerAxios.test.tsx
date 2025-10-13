import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CrudServerAxios from '@/pages/data/http/axios/crud/CrudServerAxios';

vi.mock('@/services/api.axios', () => {
  return {
    listDestinations: vi.fn().mockResolvedValue([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
      { id: 2, name: 'Mars', description: 'The red planet' },
    ]),
    createDestination: vi.fn().mockResolvedValue({ id: 3, name: 'Europa', description: 'Icy moon of Jupiter' }),
    updateDestination: vi.fn().mockResolvedValue({ id: 1, name: 'Moon', description: 'Edited' }),
    deleteDestination: vi.fn().mockResolvedValue(undefined),
  };
});

describe('CrudServerAxios (Axios + JSON Server)', () => {
  it('loads items and supports create/update/delete via axios service calls', async () => {
      const api = await import('@/services/api.axios');

    render(<CrudServerAxios />);

    // Initial load
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(items[1]).toHaveTextContent('Mars');
    expect(api.listDestinations).toHaveBeenCalledTimes(1);

    // Create
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => expect(api.createDestination).toHaveBeenCalledWith({ name: 'Europa', description: 'Icy moon of Jupiter' }));
    await screen.findByText('Europa');

    // Edit and Update
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    await waitFor(() => expect(api.updateDestination).toHaveBeenCalled());
    const itemsAfterUpdate = await screen.findAllByRole('listitem');
    expect(itemsAfterUpdate[0]).toHaveTextContent('Edited');

    // Delete
    fireEvent.click(screen.getAllByText('Delete')[1]);
    await waitFor(() => expect(api.deleteDestination).toHaveBeenCalledWith(2));
  });
});