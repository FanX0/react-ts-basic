import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Header from '@/components/layout/Header';

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders brand logo', () => {
    renderWithRouter(<Header />);
    
    const logo = screen.getByAltText('Loopstudios');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg');
  });

  it('renders mobile menu toggle button', () => {
    const { container } = renderWithRouter(<Header />);
    
    const toggleButton = container.querySelector('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles mobile menu when button is clicked', () => {
    const { container } = renderWithRouter(<Header />);
    
    const toggleButton = container.querySelector('button');
    const nav = container.querySelector('nav');
    
    // Initially closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(nav).toHaveAttribute('aria-hidden', 'true');
    expect(nav).toHaveClass('hidden');
    
    // Click to open
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(nav).toHaveAttribute('aria-hidden', 'false');
    expect(nav).not.toHaveClass('hidden');
    
    // Click to close
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(nav).toHaveAttribute('aria-hidden', 'true');
    expect(nav).toHaveClass('hidden');
  });

  it('has correct accessibility attributes', () => {
    const { container } = renderWithRouter(<Header />);
    
    const toggleButton = container.querySelector('button');
    const nav = container.querySelector('nav');
    
    expect(toggleButton).toHaveAttribute('aria-controls');
    expect(nav).toHaveAttribute('id');
    
    const controlsId = toggleButton.getAttribute('aria-controls');
    const navId = nav.getAttribute('id');
    expect(controlsId).toBe(navId);
  });

  it('renders navigation links', () => {
    const { container } = renderWithRouter(<Header />);
    
    // Open the mobile menu to see the links
    const toggleButton = container.querySelector('button');
    fireEvent.click(toggleButton);
    
    // Check for home link
    const homeLink = container.querySelector('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has screen reader text for toggle button', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Toggle navigation')).toBeInTheDocument();
  });

  it('shows correct icon alt text based on menu state', () => {
    const { container } = renderWithRouter(<Header />);
    
    // Initially shows "Open menu"
    expect(screen.getByAltText('Open menu')).toBeInTheDocument();
    
    // After clicking, shows "Close menu"
    const toggleButton = container.querySelector('button');
    fireEvent.click(toggleButton);
    expect(screen.getByAltText('Close menu')).toBeInTheDocument();
  });
});