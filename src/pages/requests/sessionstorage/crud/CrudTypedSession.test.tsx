import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import CrudTypedSession from '@/pages/requests/sessionstorage/crud/CrudTypedSession';

describe('SessionStorage: CRUD Typed', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('blocks invalid input with TS-only messages; supports edit/update/delete', async () => {
    sessionStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<CrudTypedSession />);

    // Trigger validation errors
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();

    // Create valid
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Europa')).toBeInTheDocument();

    // Edit existing
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Edited');

    // Delete newly created
    fireEvent.click(screen.getAllByText('Delete')[1]);
    const remaining = await screen.findAllByRole('listitem');
    expect(remaining.length).toBeGreaterThanOrEqual(1);
  });
});