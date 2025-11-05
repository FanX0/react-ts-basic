import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import BasicIndex from './BasicIndex';

// Mock the document.title
Object.defineProperty(document, 'title', {
  writable: true,
  value: '',
});

describe('BasicIndex', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <BasicIndex />
      </BrowserRouter>
    );
    
    expect(container.firstChild).toBeTruthy();
  });

  it('sets the document title', () => {
    render(
      <BrowserRouter>
        <BasicIndex />
      </BrowserRouter>
    );
    
    expect(document.title).toBe('React Basics Documentation');
  });

  it('contains expected structure', () => {
    const { container } = render(
      <BrowserRouter>
        <BasicIndex />
      </BrowserRouter>
    );
    
    // Check for basic HTML structure
    expect(container.querySelector('h2')).toBeTruthy();
    expect(container.querySelector('p')).toBeTruthy();
    expect(container.querySelector('section')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelector('a')).toBeTruthy();
  });

  it('contains navigation links', () => {
    const { container } = render(
      <BrowserRouter>
        <BasicIndex />
      </BrowserRouter>
    );
    
    // Check for multiple links
    const links = container.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(5);
  });
});