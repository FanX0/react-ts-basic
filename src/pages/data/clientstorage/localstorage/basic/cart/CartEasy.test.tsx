import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CartEasy from '@/pages/data/clientstorage/localstorage/basic/cart/CartEasy';
import * as cartStore from '@/services/cart';

// Mock the cart service
vi.mock('@/services/cart');

describe('CartEasy', () => {
  const mockCartItems = [
    { id: 1, name: 'Apple', qty: 3 },
    { id: 2, name: 'Banana', qty: 2 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cartStore.load).mockReturnValue([]);
    vi.mocked(cartStore.save).mockImplementation(() => {});
    vi.mocked(cartStore.clear).mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the cart page with title', () => {
    render(<CartEasy />);
    
    expect(screen.getByText('LocalStorage Cart: Easy')).toBeInTheDocument();
    expect(screen.getByText('Add and Snapshot')).toBeInTheDocument();
  });

  it('loads existing items from cart store on mount', () => {
    vi.mocked(cartStore.load).mockReturnValue(mockCartItems);
    
    render(<CartEasy />);
    
    expect(cartStore.load).toHaveBeenCalled();
    expect(screen.getByText('Apple — qty: 3')).toBeInTheDocument();
    expect(screen.getByText('Banana — qty: 2')).toBeInTheDocument();
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '5';
    });
    expect(totalElement).toBeInTheDocument();
  });

  it('adds a new item to the cart', () => {
    render(<CartEasy />);
    
    const nameInput = screen.getByPlaceholderText('Item name');
    const qtyInput = screen.getByPlaceholderText('Qty');
    const addButton = screen.getByText('Add item');
    
    fireEvent.change(nameInput, { target: { value: 'Orange' } });
    fireEvent.change(qtyInput, { target: { value: '4' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Orange — qty: 4')).toBeInTheDocument();
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '4';
    });
    expect(totalElement).toBeInTheDocument();
    
    // Form should be cleared after adding
    expect(nameInput).toHaveValue('');
    expect(qtyInput).toHaveValue(1);
  });

  it('does not add item with empty name', () => {
    render(<CartEasy />);
    
    const nameInput = screen.getByPlaceholderText('Item name');
    const qtyInput = screen.getByPlaceholderText('Qty');
    const addButton = screen.getByText('Add item');
    
    fireEvent.change(nameInput, { target: { value: '   ' } }); // Only whitespace
    fireEvent.change(qtyInput, { target: { value: '2' } });
    fireEvent.click(addButton);
    
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '0';
    });
    expect(totalElement).toBeInTheDocument();
    expect(screen.queryByText('— qty: 2')).not.toBeInTheDocument();
  });

  it('clamps quantity to minimum of 1', () => {
    render(<CartEasy />);
    
    const nameInput = screen.getByPlaceholderText('Item name');
    const qtyInput = screen.getByPlaceholderText('Qty');
    const addButton = screen.getByText('Add item');
    
    // Test negative quantity
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(qtyInput, { target: { value: '-5' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test Item — qty: 1')).toBeInTheDocument();
  });

  it('handles non-finite quantity values', () => {
    render(<CartEasy />);
    
    const nameInput = screen.getByPlaceholderText('Item name');
    const qtyInput = screen.getByPlaceholderText('Qty');
    const addButton = screen.getByText('Add item');
    
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(qtyInput, { target: { value: 'abc' } }); // Non-numeric
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test Item — qty: 1')).toBeInTheDocument();
  });

  it('generates sequential IDs for new items', () => {
    vi.mocked(cartStore.load).mockReturnValue([
      { id: 5, name: 'Existing', qty: 1 }
    ]);
    
    render(<CartEasy />);
    
    const nameInput = screen.getByPlaceholderText('Item name');
    const addButton = screen.getByText('Add item');
    
    fireEvent.change(nameInput, { target: { value: 'New Item' } });
    fireEvent.click(addButton);
    
    // Should generate ID 6 (max existing ID + 1)
    expect(screen.getByText('New Item — qty: 1')).toBeInTheDocument();
  });

  it('saves items to cart store when save button is clicked', () => {
    render(<CartEasy />);
    
    // Add an item first
    const nameInput = screen.getByPlaceholderText('Item name');
    const addButton = screen.getByText('Add item');
    
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.click(addButton);
    
    // Click save
    const saveButton = screen.getByText('Save snapshot');
    fireEvent.click(saveButton);
    
    expect(cartStore.save).toHaveBeenCalledWith([
      { id: 1, name: 'Test Item', qty: 1 }
    ]);
  });

  it('loads items from cart store when load button is clicked', () => {
    vi.mocked(cartStore.load).mockReturnValue(mockCartItems);
    
    render(<CartEasy />);
    
    const loadButton = screen.getByText('Load snapshot');
    fireEvent.click(loadButton);
    expect(cartStore.load).toHaveBeenCalled();
    expect(screen.getByText('Apple — qty: 3')).toBeInTheDocument();
    expect(screen.getByText('Banana — qty: 2')).toBeInTheDocument();
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '5';
    });
    expect(totalElement).toBeInTheDocument();
  });

  it('clears localStorage when clear localStorage button is clicked', () => {
    render(<CartEasy />);
    
    const clearStorageButton = screen.getByText('Clear localStorage');
    fireEvent.click(clearStorageButton);
    
    expect(cartStore.clear).toHaveBeenCalled();
  });

  it('clears state when clear state button is clicked', () => {
    vi.mocked(cartStore.load).mockReturnValue(mockCartItems);
    
    render(<CartEasy />);
    
    // Initially should have items
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '5';
    });
    expect(totalElement).toBeInTheDocument();
    
    const clearStateButton = screen.getByText('Clear state');
    fireEvent.click(clearStateButton);
    
    const totalElementAfterClear = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '0';
    });
    expect(totalElementAfterClear).toBeInTheDocument();
    expect(screen.queryByText('Apple — qty: 3')).not.toBeInTheDocument();
  })

  it('calculates total quantity correctly', () => {
    render(<CartEasy />);
    
    const nameInput = screen.getByPlaceholderText('Item name');
    const qtyInput = screen.getByPlaceholderText('Qty');
    const addButton = screen.getByText('Add item');
    
    // Add first item
    fireEvent.change(nameInput, { target: { value: 'Item 1' } });
    fireEvent.change(qtyInput, { target: { value: '3' } });
    fireEvent.click(addButton);
    
    // Add second item
    fireEvent.change(nameInput, { target: { value: 'Item 2' } });
    fireEvent.change(qtyInput, { target: { value: '7' } });
    fireEvent.click(addButton);
    
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '10';
    });
    expect(totalElement).toBeInTheDocument();
  });

  it('handles items with missing or invalid qty values', () => {
    vi.mocked(cartStore.load).mockReturnValue([
      { id: 1, name: 'Item 1', qty: 3 },
      { id: 2, name: 'Item 2', qty: undefined as any },
      { id: 3, name: 'Item 3', qty: null as any }
    ]);
    
    render(<CartEasy />);
    
    // Should handle undefined/null qty values gracefully
    const totalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === '3';
    });
    expect(totalElement).toBeInTheDocument();
  });

  it('renders back to basics link', () => {
    render(<CartEasy />);
    
    const backLink = screen.getByRole('link', { name: 'Back to Basics' });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/basic');
  });

  it('displays service information', () => {
    render(<CartEasy />);
    
    expect(screen.getByText(/Data persists under/)).toBeInTheDocument();
    expect(screen.getByText('"cart"')).toBeInTheDocument();
    expect(screen.getByText('src/services/cart.ts')).toBeInTheDocument();
  });

  it('has proper form accessibility', () => {
    render(<CartEasy />);
    
    const nameInput = screen.getByRole('textbox', { name: 'Item name' });
    const qtyInput = screen.getByRole('spinbutton', { name: 'Qty' });
    
    expect(nameInput).toHaveAttribute('placeholder', 'Item name');
    expect(qtyInput).toHaveAttribute('type', 'number');
    expect(qtyInput).toHaveAttribute('min', '1');
  });
});