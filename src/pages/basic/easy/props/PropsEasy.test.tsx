import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PropsEasy from './PropsEasy';

describe('PropsEasy', () => {
  it('renders without crashing', () => {
    const { container } = render(<PropsEasy />);
    
    // Just check that the component renders something
    expect(container.firstChild).toBeTruthy();
  });

  it('contains expected structure', () => {
    const { container } = render(<PropsEasy />);
    
    // Check for basic HTML structure
    expect(container.querySelector('h2')).toBeTruthy();
    expect(container.querySelector('p')).toBeTruthy();
    expect(container.querySelector('section')).toBeTruthy();
  });
});