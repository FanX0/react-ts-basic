import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import DisclosureItem from '@/components/disclosure/DisclosureItem';

describe('DisclosureItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the component correctly', () => {
    render(<DisclosureItem />);
    
    expect(screen.getByText('halo dek')).toBeInTheDocument();
  });

  it('renders as a paragraph element', () => {
    render(<DisclosureItem />);
    
    const paragraph = screen.getByText('halo dek');
    expect(paragraph.tagName).toBe('P');
  });
});