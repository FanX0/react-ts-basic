import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import StorageEasy from '@/pages/requests/localstorage/juststorage/StorageEasy';

describe('LocalStorage: StorageEasy', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders seeded items and supports create', async () => {
    localStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<StorageEasy />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Mars' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'The red planet' } });
    fireEvent.click(screen.getByText('Create'));

    expect(await screen.findByText('Mars')).toBeInTheDocument();
  });
});