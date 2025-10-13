import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import StorageHook from '@/pages/data/clientstorage/sessionstorage/juststorage/StorageHook';

describe('SessionStorage: StorageHook', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders list items and refresh works', async () => {
    sessionStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
      { id: 2, name: 'Mars', description: 'The red planet' },
    ]));

    render(<StorageHook />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(items[1]).toHaveTextContent('Mars');

    // Change storage and refresh to re-read
    sessionStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Europa', description: 'Icy moon of Jupiter' },
    ]));
    fireEvent.click(screen.getByText('Refresh'));
    expect(await screen.findByText('Europa')).toBeInTheDocument();
  });
});