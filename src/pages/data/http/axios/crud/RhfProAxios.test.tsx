import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RhfProAxios from './RhfProAxios';

vi.mock('@/hooks/useDestinationsCrudAxios', () => ({
  useDestinationsCrudAxios: () => ({
    items: [
      { id: 1, name: 'Moon', description: "Earth's natural satellite" },
      { id: 2, name: 'Mars', description: 'The red planet' },
    ],
    loading: false,
    error: null,
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe('RhfProAxios', () => {
  it('renders without crashing', () => {
    const { container } = render(<RhfProAxios />);
    expect(container.firstChild).toBeTruthy();
  });

  it('contains expected structure', () => {
    const { container } = render(<RhfProAxios />);
    
    // Check for basic HTML structure
    expect(container.querySelector('h2')).toBeTruthy();
    expect(container.querySelector('p')).toBeTruthy();
    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelector('input')).toBeTruthy();
    expect(container.querySelector('button')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
  });

  it('has form inputs and buttons', () => {
    const { container } = render(<RhfProAxios />);
    
    // Check for form elements
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
    
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});