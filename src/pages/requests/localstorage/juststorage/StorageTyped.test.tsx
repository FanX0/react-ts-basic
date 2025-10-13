import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import StorageTyped from '@/pages/requests/localstorage/juststorage/StorageTyped';

describe('LocalStorage: StorageTyped', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows validation messages and supports create', async () => {
    localStorage.setItem('destinations', JSON.stringify([
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    ]));

    render(<StorageTyped />);

    // Attempt to submit empty
    fireEvent.click(screen.getByText('Create'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();

    // Fill valid and submit
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Mars' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'The red planet' } });
    fireEvent.click(screen.getByText('Create'));

    expect(await screen.findByText('Mars')).toBeInTheDocument();
  });
});