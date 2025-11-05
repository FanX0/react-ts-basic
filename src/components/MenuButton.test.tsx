import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MenuButton from '@/components/MenuButton';

describe('MenuButton', () => {
  const mockProps = {
    onRename: vi.fn(),
    onDuplicate: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders menu button and opens menu on click', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onRename when rename menu item is clicked', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    fireEvent.click(button);
    
    const renameItem = screen.getByText('Rename');
    fireEvent.click(renameItem);
    
    expect(mockProps.onRename).toHaveBeenCalledTimes(1);
  });

  it('calls onDuplicate when duplicate menu item is clicked', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    fireEvent.click(button);
    
    const duplicateItem = screen.getByText('Duplicate');
    fireEvent.click(duplicateItem);
    
    expect(mockProps.onDuplicate).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete menu item is clicked', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    fireEvent.click(button);
    
    const deleteItem = screen.getByText('Delete');
    fireEvent.click(deleteItem);
    
    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('opens menu with ArrowDown key', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    fireEvent.keyDown(button, { key: 'ArrowDown' });
    
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens menu with ArrowUp key', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    fireEvent.keyDown(button, { key: 'ArrowUp' });
    
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes menu when clicking outside', () => {
    const { container } = render(<MenuButton {...mockProps} />);
    
    const button = container.querySelector('button[aria-haspopup="menu"]');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    
    fireEvent.click(document.body);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});