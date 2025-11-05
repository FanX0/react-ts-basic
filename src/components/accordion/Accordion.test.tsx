import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import Accordion from '@/components/accordion/Accordion';
import AccordionItem from '@/components/accordion/AccordionItem';

describe('Accordion', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders accordion items correctly', () => {
    render(
      <Accordion>
        <AccordionItem value="item1" label="First Item">
          First content
        </AccordionItem>
        <AccordionItem value="item2" label="Second Item">
          Second content
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
  });

  it('opens and closes accordion items', () => {
    render(
      <Accordion>
        <AccordionItem value="item1" label="First Item">
          First content
        </AccordionItem>
        <AccordionItem value="item2" label="Second Item">
          Second content
        </AccordionItem>
      </Accordion>
    );

    const firstButton = screen.getByText('First Item');
    const secondButton = screen.getByText('Second Item');

    // Initially both should be closed
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    // Open first item
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('First content')).toBeVisible();

    // Open second item (should close first)
    fireEvent.click(secondButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Second content')).toBeVisible();
  });

  it('respects defaultValue prop', () => {
    render(
      <Accordion defaultValue="item2">
        <AccordionItem value="item1" label="First Item">
          First content
        </AccordionItem>
        <AccordionItem value="item2" label="Second Item">
          Second content
        </AccordionItem>
      </Accordion>
    );

    const firstButton = screen.getByText('First Item');
    const secondButton = screen.getByText('Second Item');

    // Second item should be open by default
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Second content')).toBeVisible();
  });

  it('handles null children gracefully', () => {
    render(
      <Accordion>
        <AccordionItem value="item1" label="First Item">
          First content
        </AccordionItem>
        {null}
        <AccordionItem value="item2" label="Second Item">
          Second content
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
  });
});