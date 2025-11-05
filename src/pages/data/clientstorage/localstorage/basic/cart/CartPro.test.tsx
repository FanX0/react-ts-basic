import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CartPro from '@/pages/data/clientstorage/localstorage/basic/cart/CartPro';
import * as cartStore from '@/services/cart';

vi.mock('@/services/cart');

describe('CartPro', () => {
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

  it('renders page sections and title', () => {
    render(<CartPro />);
    expect(screen.getByText('LocalStorage Cart: Pro')).toBeInTheDocument();
    expect(screen.getByText('Easy Snapshot')).toBeInTheDocument();
    expect(screen.getByText('Pro Features')).toBeInTheDocument();
  });

  it('loads items on mount and shows totals', () => {
    vi.mocked(cartStore.load).mockReturnValue(mockCartItems);
    render(<CartPro />);
    expect(cartStore.load).toHaveBeenCalled();
    expect(screen.getByText('Apple — qty: 3')).toBeInTheDocument();
    expect(screen.getByText('Banana — qty: 2')).toBeInTheDocument();
    const totalQtyP = screen.getByText('Total quantity:', { selector: 'p' });
    expect(within(totalQtyP).getByText('5')).toBeInTheDocument();
  });

  it('adds item and auto-saves when autoSave enabled', () => {
    render(<CartPro />);
    const name = screen.getByPlaceholderText('Item name');
    const qty = screen.getByPlaceholderText('Qty');
    fireEvent.change(name, { target: { value: 'Orange' } });
    fireEvent.change(qty, { target: { value: '4' } });
    fireEvent.click(screen.getByText('Add item'));

    expect(screen.getByText('Orange — qty: 4')).toBeInTheDocument();
    expect(cartStore.save).toHaveBeenCalled();
    expect(screen.getByText(/Last saved:/)).toBeInTheDocument();
  });

  it('disables auto-save and shows manual save button', async () => {
    render(<CartPro />);
    const autoSaveCheckbox = screen.getByRole('checkbox');
    fireEvent.click(autoSaveCheckbox); // uncheck

    // Clear initial auto-save call on mount
    vi.clearAllMocks();

    const name = screen.getByPlaceholderText('Item name');
    fireEvent.change(name, { target: { value: 'Item 1' } });
    fireEvent.click(screen.getByText('Add item'));

    await waitFor(() => expect(screen.getByText('Save now')).toBeInTheDocument());
    await waitFor(() => expect(cartStore.save).not.toHaveBeenCalled());

    fireEvent.click(screen.getByText('Save now'));
    await waitFor(() => expect(cartStore.save).toHaveBeenCalled());
  });

  it('sorts items by name ascending and descending', async () => {
    vi.mocked(cartStore.load).mockReturnValue([
      { id: 1, name: 'B', qty: 1 },
      { id: 2, name: 'A', qty: 1 }
    ]);
    render(<CartPro />);

    const lists = screen.getAllByRole('list');
    const proList = lists[1];

    // Ascending by default: A then B inside Pro Features list
    await waitFor(() => {
      const items = within(proList).getAllByRole('listitem');
      expect(items[0]).toHaveTextContent(/A/);
      expect(items[1]).toHaveTextContent(/B/);
    });

    // Toggle sort
    fireEvent.click(screen.getByText(/Sort by name:/));
    await waitFor(() => {
      const items = within(proList).getAllByRole('listitem');
      expect(items[0]).toHaveTextContent(/B/);
      expect(items[1]).toHaveTextContent(/A/);
    });
  });

  it('starts editing, applies changes, and cancels edit', () => {
    vi.mocked(cartStore.load).mockReturnValue([{ id: 1, name: 'Item', qty: 2 }]);
    render(<CartPro />);

    fireEvent.click(screen.getByText('Edit'));
    const nameEdit = screen.getByLabelText('Edit name');
    const qtyEdit = screen.getByLabelText('Edit qty');

    fireEvent.change(nameEdit, { target: { value: 'Renamed' } });
    fireEvent.change(qtyEdit, { target: { value: '5' } });
    fireEvent.click(screen.getByText('Apply'));

    expect(screen.getByText('Renamed — qty: 5')).toBeInTheDocument();

    // Re-enter edit and cancel
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(nameEdit, { target: { value: 'Nope' } });
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Nope — qty:')).not.toBeInTheDocument();
  });

  it('increments and decrements quantity with clamping', () => {
    vi.mocked(cartStore.load).mockReturnValue([{ id: 1, name: 'Item', qty: 1 }]);
    render(<CartPro />);

    fireEvent.click(screen.getByText('+1'));
    expect(screen.getByText('Item — qty: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('-1'));
    expect(screen.getByText('Item — qty: 1')).toBeInTheDocument();

    // clamp at 1, additional -1 should keep at 1
    fireEvent.click(screen.getByText('-1'));
    expect(screen.getByText('Item — qty: 1')).toBeInTheDocument();
  });

  it('removes item', () => {
    vi.mocked(cartStore.load).mockReturnValue([{ id: 1, name: 'Item', qty: 2 }]);
    render(<CartPro />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('Item — qty: 2')).not.toBeInTheDocument();
  });

  it('updates derived totals', () => {
    render(<CartPro />);

    const name = screen.getByPlaceholderText('Item name');
    const qty = screen.getByPlaceholderText('Qty');

    fireEvent.change(name, { target: { value: 'A' } });
    fireEvent.change(qty, { target: { value: '3' } });
    fireEvent.click(screen.getByText('Add item'));

    fireEvent.change(name, { target: { value: 'B' } });
    fireEvent.change(qty, { target: { value: '7' } });
    fireEvent.click(screen.getByText('Add item'));

    expect(screen.getByText(/Items:/)).toHaveTextContent('Items: 2');
    expect(screen.getByText(/Total qty:/)).toHaveTextContent('Total qty: 10');
  });

  it('renders back link and service info', () => {
    render(<CartPro />);
    const backLink = screen.getByRole('link', { name: 'Back to Basics' });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/basic');
    expect(screen.getByText(/Data persists under/)).toBeInTheDocument();
    expect(screen.getByText('src/services/cart.ts')).toBeInTheDocument();
  });
});