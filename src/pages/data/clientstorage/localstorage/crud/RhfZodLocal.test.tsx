import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import RhfZodLocal from '@/pages/data/clientstorage/localstorage/crud/RhfZodLocal';

describe('LocalStorage: RHF + Zod', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows zod errors on invalid input and supports full CRUD', async () => {
    localStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<RhfZodLocal />);

    // Submit empty to assert zod messages
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();

    // Create valid
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Europa')).toBeInTheDocument();

    // Edit first item
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Edited');

    // Delete the second (newly created)
    fireEvent.click(screen.getAllByText('Delete')[1]);
    const remaining = await screen.findAllByRole('listitem');
    expect(remaining).toHaveLength(1);
  });
});