import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import StorageEasy from '@/pages/requests/sessionstorage/juststorage/StorageEasy';

describe('SessionStorage: StorageEasy', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders seeded items only (read-only)', async () => {
    sessionStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<StorageEasy />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Name')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Description')).not.toBeInTheDocument();
  });
});