import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PropsConditional from '@/pages/basic/easy/props/PropsConditional';

describe('PropsConditional', () => {
  it('toggles conditional sections and renders logical AND content', () => {
    render(<PropsConditional />);

    // Toggle show off -> Null component hides content; ternary shows Hidden
    const toggleBtn = screen.getByText(/Toggle show:/i);
    fireEvent.click(toggleBtn);
    expect(screen.queryByText(/Visible only when/)).toBeNull();
    expect(screen.getByText('Hidden')).toBeInTheDocument();

    // Increment count to trigger logical AND render
    const incBtn = screen.getByText(/Inc count:/i);
    fireEvent.click(incBtn);
    expect(screen.getByText('Count is greater than 0')).toBeInTheDocument();
  });
});