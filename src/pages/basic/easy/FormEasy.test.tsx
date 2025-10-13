import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormEasy from '@/pages/basic/easy/FormEasy';

describe('FormEasy', () => {
  it('enables submit when inputs valid and shows submitted', () => {
    render(<FormEasy />);

    const submitBtn = screen.getByText('Submit') as HTMLButtonElement;
    expect(submitBtn).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('Ada'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('ada@example.com'), { target: { value: 'ada@example.com' } });

    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(submitBtn);
    expect(screen.getByText(/Submitted:/)).toBeInTheDocument();
    expect(screen.getByText(/Ada/)).toBeInTheDocument();
  });
});