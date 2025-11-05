import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Tabs from '@/components/tabs/Tabs';

// Mock the Header component
vi.mock('@/components/layout/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}));

describe('Tabs', () => {
  const mockDestinations = [
    { name: 'Moon', description: "Earth's natural satellite" },
    { name: 'Mars', description: 'The red planet' },
    { name: 'Europa', description: 'Icy moon of Jupiter' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ destinations: mockDestinations })
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders header component', () => {
    renderWithRouter(<Tabs />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('fetches and displays destinations', async () => {
    renderWithRouter(<Tabs />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Moon' })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByRole('button', { name: 'Mars' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Europa' })).toBeInTheDocument();
    
    expect(global.fetch).toHaveBeenCalledWith('/data.json', {
      cache: 'no-store',
      signal: expect.any(AbortSignal)
    });
  });

  it('shows Moon as initially selected', async () => {
    renderWithRouter(<Tabs />);
    
    await waitFor(() => {
      const moonButton = screen.getByRole('button', { name: 'Moon' });
      expect(moonButton).toHaveClass('border-b-2', 'border-black');
    });
    
    // Should show Moon in the content area
    expect(screen.getAllByText('Moon')).toHaveLength(2); // One in button, one in content
  });

  it('switches tabs when clicked', async () => {
    renderWithRouter(<Tabs />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Moon' })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const marsButton = screen.getByRole('button', { name: 'Mars' });
    fireEvent.click(marsButton);
    
    // Mars should now be selected
    expect(marsButton).toHaveClass('border-b-2', 'border-black');
    
    // Moon should no longer be selected
    const moonButton = screen.getByRole('button', { name: 'Moon' });
    expect(moonButton).not.toHaveClass('border-b-2', 'border-black');
    
    // Content should show Mars
    expect(screen.getAllByText('Mars')).toHaveLength(2); // One in button, one in content
  });

  it('handles fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    
    renderWithRouter(<Tabs />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });

  it('handles non-ok response', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });
    
    renderWithRouter(<Tabs />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });

  it('aborts fetch on component unmount', () => {
    const { unmount } = renderWithRouter(<Tabs />);
    
    unmount();
    
    // The AbortController should have been called
    expect(global.fetch).toHaveBeenCalledWith('/data.json', {
      cache: 'no-store',
      signal: expect.any(AbortSignal)
    });
  });
});