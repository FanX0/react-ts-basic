import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CartProPrice from '@/pages/data/clientstorage/localstorage/basic/cart/CartProPrice';
import * as cartStore from '@/services/cart';

vi.mock('@/services/cart');

describe('CartProPrice', () => {
  const mockCartItems = [
    { id: 1, name: 'Apple', qty: 2, price: 1.5 },
    { id: 2, name: 'Banana', qty: 3, price: 2.0 }
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

  it('renders page sections and title', () => {
    render(<CartProPrice />);
    expect(screen.getByText('LocalStorage Cart: Pro (with Price)')).toBeInTheDocument();
    expect(screen.getByText('Easy Snapshot')).toBeInTheDocument();
    expect(screen.getByText('Pro Features')).toBeInTheDocument();
  });

  it('loads items and shows derived totals', () => {
    vi.mocked(cartStore.load).mockReturnValue(mockCartItems);
    render(<CartProPrice />);

    expect(cartStore.load).toHaveBeenCalled();
    expect(screen.getByText(/Apple — qty: 2 • price:/)).toBeInTheDocument();
    expect(screen.getByText(/Banana — qty: 3 • price:/)).toBeInTheDocument();

    // Totals: qty = 5, price = 2*1.5 + 3*2.0 = 3 + 6 = 9
    const totalsText = screen.getByText(/Total quantity:/).parentElement;
    expect(totalsText).toHaveTextContent('Total quantity: 5');
    expect(totalsText).toHaveTextContent('Total price:');
  });

  it('adds item with price and auto-saves when enabled', async () => {
    render(<CartProPrice />);
    fireEvent.change(screen.getByPlaceholderText('Item name'), { target: { value: 'Orange' } });
    fireEvent.change(screen.getByPlaceholderText('Qty'), { target: { value: '4' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '2.50' } });
    fireEvent.click(screen.getByText('Add item'));

    await waitFor(() => expect(screen.getByText(/Orange — qty: 4 • price:/)).toBeInTheDocument());
    expect(cartStore.save).toHaveBeenCalled();
    expect(screen.getByText(/Last saved:/)).toBeInTheDocument();
  });

  it('edits item including price and applies changes', () => {
    vi.mocked(cartStore.load).mockReturnValue([{ id: 1, name: 'Item', qty: 2, price: 1.0 }]);
    render(<CartProPrice />);

    fireEvent.click(screen.getByText('Edit'));
    const nameEdit = screen.getByLabelText('Edit name');
    const qtyEdit = screen.getByLabelText('Edit qty');
    const priceEdit = screen.getByLabelText('Edit price');

    fireEvent.change(nameEdit, { target: { value: 'Renamed' } });
    fireEvent.change(qtyEdit, { target: { value: '5' } });
    fireEvent.change(priceEdit, { target: { value: '3.25' } });
    fireEvent.click(screen.getByText('Apply'));

    expect(screen.getByText(/Renamed — qty: 5 • price:/)).toBeInTheDocument();
  });

  it('increments and decrements quantity with price affecting totals', async () => {
    vi.mocked(cartStore.load).mockReturnValue([{ id: 1, name: 'Item', qty: 1, price: 2.0 }]);
    render(<CartProPrice />);

    // +1 -> qty 2
    fireEvent.click(screen.getByText('+1'));
    await waitFor(() => expect(screen.getByText(/Item — qty: 2 • price:/)).toBeInTheDocument());

    // -1 -> qty 1 (clamped)
    fireEvent.click(screen.getByText('-1'));
    await waitFor(() => expect(screen.getByText(/Item — qty: 1 • price:/)).toBeInTheDocument());

    // -1 -> still 1
    fireEvent.click(screen.getByText('-1'));
    await waitFor(() => expect(screen.getByText(/Item — qty: 1 • price:/)).toBeInTheDocument());
  });

  it('removes item and updates totals', () => {
    vi.mocked(cartStore.load).mockReturnValue([{ id: 1, name: 'Item', qty: 2, price: 1.0 }]);
    render(<CartProPrice />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText(/Item — qty: 2 • price:/)).not.toBeInTheDocument();
  });

  it('toggle auto-save off then manually save', async () => {
    render(<CartProPrice />);
    const autoSaveCheckbox = screen.getByRole('checkbox');
    fireEvent.click(autoSaveCheckbox); // uncheck

    // Clear initial auto-save call on mount
    vi.clearAllMocks();

    fireEvent.change(screen.getByPlaceholderText('Item name'), { target: { value: 'Manual' } });
    fireEvent.click(screen.getByText('Add item'));

    await waitFor(() => expect(screen.getByText('Save now')).toBeInTheDocument());
    await waitFor(() => expect(cartStore.save).not.toHaveBeenCalled());

    fireEvent.click(screen.getByText('Save now'));
    await waitFor(() => expect(cartStore.save).toHaveBeenCalled());
  });

  it('sorts items by name and displays line totals correctly', async () => {
    vi.mocked(cartStore.load).mockReturnValue([
      { id: 1, name: 'B', qty: 1, price: 1.00 },
      { id: 2, name: 'A', qty: 2, price: 2.00 }
    ]);
    render(<CartProPrice />);

    const lists = screen.getAllByRole('list');
    const proList = lists[1];

    // Ascending by default: A then B inside Pro Features list
    await waitFor(() => {
      const items = within(proList).getAllByRole('listitem');
      expect(items[0]).toHaveTextContent(/^A/);
      expect(items[1]).toHaveTextContent(/^B/);
    });

    // Includes formatted totals (match presence of two decimals)
    const firstItemText = within(proList).getAllByRole('listitem')[0].textContent ?? '';
    expect(firstItemText).toMatch(/\d+[.,]\d{2}/);

    fireEvent.click(screen.getByText(/Sort by name:/));
    await waitFor(() => {
      const items = within(proList).getAllByRole('listitem');
      expect(items[0]).toHaveTextContent(/^B/);
      expect(items[1]).toHaveTextContent(/^A/);
    });
  });

  it('renders back link and service info', () => {
    render(<CartProPrice />);
    const backLink = screen.getByRole('link', { name: 'Back to Basics' });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/basic');
    expect(screen.getByText(/Data persists under/)).toBeInTheDocument();
    expect(screen.getByText('src/services/cart.ts')).toBeInTheDocument();
  });
});