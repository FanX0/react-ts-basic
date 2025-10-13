import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import StorageTyped from '@/pages/requests/sessionstorage/juststorage/StorageTyped';

describe('SessionStorage: StorageTyped', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders seeded items only (typed, read-only)', async () => {
    sessionStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<StorageTyped />);

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Moon');
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Description is required')).not.toBeInTheDocument();
  });
});