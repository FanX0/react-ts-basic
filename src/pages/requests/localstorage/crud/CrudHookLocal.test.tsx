import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import CrudHookLocal from '@/pages/requests/localstorage/crud/CrudHookLocal';

describe('LocalStorage: CRUD Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('supports create, edit/update, and delete via hook', async () => {
    localStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
      { id: 2, name: 'Mars', description: 'The red planet' },
    ]));

    render(<CrudHookLocal />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(items[1]).toHaveTextContent('Mars');

    // Edit first item
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Update'));
    {
      const updatedItems = await screen.findAllByRole('listitem');
      expect(updatedItems[0]).toHaveTextContent('Edited');
    }

    // Delete second item
    fireEvent.click(screen.getAllByText('Delete')[1]);
    const remaining = await screen.findAllByRole('listitem');
    expect(remaining).toHaveLength(1);
  });
});