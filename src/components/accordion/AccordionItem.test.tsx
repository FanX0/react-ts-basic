import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AccordionItem from '@/components/accordion/AccordionItem';

describe('AccordionItem', () => {
  const mockProps = {
    label: 'Test Label',
    children: 'Test content',
    open: false,
    onOpen: vi.fn(),
    btnId: 'test-btn',
    panelId: 'test-panel',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders label and content correctly', () => {
    render(<AccordionItem {...mockProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('has correct accessibility attributes when closed', () => {
    const { container } = render(<AccordionItem {...mockProps} />);
    
    const button = container.querySelector('button');
    const panel = container.querySelector('[role="region"]');
    
    expect(button).toHaveAttribute('id', 'test-btn');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'test-panel');
    
    expect(panel).toHaveAttribute('id', 'test-panel');
    expect(panel).toHaveAttribute('aria-labelledby', 'test-btn');
    expect(panel).toHaveAttribute('hidden');
  });

  it('has correct accessibility attributes when open', () => {
    const { container } = render(<AccordionItem {...mockProps} open={true} />);
    
    const button = container.querySelector('button');
    const panel = container.querySelector('[role="region"]');
    
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('calls onOpen when button is clicked', () => {
    const { container } = render(<AccordionItem {...mockProps} />);
    
    const button = container.querySelector('button');
    fireEvent.click(button);
    
    expect(mockProps.onOpen).toHaveBeenCalledTimes(1);
  });

  it('renders children content when open', () => {
    render(<AccordionItem {...mockProps} open={true} />);
    
    const content = screen.getByText('Test content');
    expect(content).toBeVisible();
  });

  it('hides content when closed', () => {
    const { container } = render(<AccordionItem {...mockProps} open={false} />);
    
    const panel = container.querySelector('[role="region"]');
    expect(panel).toHaveAttribute('hidden');
  });
});