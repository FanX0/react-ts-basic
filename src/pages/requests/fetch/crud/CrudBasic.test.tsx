import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CrudBasic from './CrudBasic.tsx';

describe('CrudBasic (client-only)', () => {
  it('renders initial items and supports create, edit, delete', async () => {
    render(<CrudBasic />);

    // Initial list
    const initialItems = await screen.findAllByRole('listitem');
    expect(initialItems[0]).toHaveTextContent('Moon');
    expect(initialItems[1]).toHaveTextContent('Mars');

    // Create new item
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Europa' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Icy moon of Jupiter' } });
    fireEvent.click(screen.getByText('Create'));

    const itemsAfterCreate = await screen.findAllByRole('listitem');
    expect(itemsAfterCreate[2]).toHaveTextContent('Europa');
    expect(itemsAfterCreate[2]).toHaveTextContent('Icy moon of Jupiter');

    // Edit first item
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: "Earth's shiny satellite" } });
    fireEvent.click(screen.getByText('Update'));

    const itemsAfterUpdate = await screen.findAllByRole('listitem');
    expect(itemsAfterUpdate[0]).toHaveTextContent("Earth's shiny satellite");

    // Delete last item
    fireEvent.click(screen.getAllByText('Delete')[2]);
    const itemsAfterDelete = await screen.findAllByRole('listitem');
    expect(itemsAfterDelete.length).toBe(2);
  });
});