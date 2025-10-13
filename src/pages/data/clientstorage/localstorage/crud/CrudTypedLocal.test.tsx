import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import CrudTypedLocal from '@/pages/data/clientstorage/localstorage/crud/CrudTypedLocal';

describe('LocalStorage: CRUD Typed', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows validation messages and supports full CRUD', async () => {
    localStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<CrudTypedLocal />);

    // Submit empty — expect TS validation messages
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();

    // Create valid
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Mars' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'The red planet' } });
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Mars')).toBeInTheDocument();

    // Edit first item
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Edited');

    // Delete second (newly created)
    fireEvent.click(screen.getAllByText('Delete')[1]);
    const remaining = await screen.findAllByRole('listitem');
    expect(remaining).toHaveLength(1);
  });
});