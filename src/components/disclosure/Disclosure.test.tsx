import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import Disclosure from '@/components/disclosure/Disclosure';

describe('Disclosure', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders summary text correctly', () => {
    render(
      <Disclosure summary="Click to expand">
        <p>Hidden content</p>
      </Disclosure>
    );
    
    expect(screen.getByText('Click to expand')).toBeInTheDocument();
  });

  it('starts in closed state', () => {
    const { container } = render(
      <Disclosure summary="Click to expand">
        <p>Hidden content</p>
      </Disclosure>
    );
    
    const button = container.querySelector('button');
    const section = container.querySelector('section');
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(section).toHaveAttribute('hidden');
  });

  it('toggles open and closed when button is clicked', () => {
    const { container } = render(
      <Disclosure summary="Click to expand">
        <p>Hidden content</p>
      </Disclosure>
    );
    
    const button = container.querySelector('button');
    
    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    
    const section = container.querySelector('section');
    expect(section).not.toHaveAttribute('hidden');
    expect(screen.getByText('Hidden content')).toBeVisible();
    
    // Click to close
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(section).toHaveAttribute('hidden');
  });

  it('has correct accessibility attributes', () => {
    const { container } = render(
      <Disclosure summary="Click to expand">
        <p>Hidden content</p>
      </Disclosure>
    );
    
    const button = container.querySelector('button');
    const section = container.querySelector('section');
    
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-controls');
    expect(section).toHaveAttribute('id');
    
    const controlsId = button.getAttribute('aria-controls');
    const sectionId = section.getAttribute('id');
    expect(controlsId).toBe(sectionId);
  });

  it('renders children content when open', () => {
    const { container } = render(
      <Disclosure summary="Click to expand">
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </Disclosure>
    );
    
    const button = container.querySelector('button');
    fireEvent.click(button);
    
    expect(screen.getByText('First paragraph')).toBeVisible();
    expect(screen.getByText('Second paragraph')).toBeVisible();
  });
});