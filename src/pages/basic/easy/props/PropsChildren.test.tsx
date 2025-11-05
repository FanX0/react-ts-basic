import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PropsChildren from './PropsChildren';

describe('PropsChildren', () => {
  it('renders without crashing', () => {
    const { container } = render(<PropsChildren />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('contains expected structure', () => {
    const { container } = render(<PropsChildren />);
    
    // Check for basic HTML structure
    expect(container.querySelector('h2')).toBeTruthy();
    expect(container.querySelector('p')).toBeTruthy();
    expect(container.querySelector('section')).toBeTruthy();
  });
});