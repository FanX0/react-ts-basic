import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import BasicIndex from './BasicIndex.tsx';

describe('BasicIndex', () => {
  it('renders key basic links', () => {
    render(
      <MemoryRouter>
        <BasicIndex />
      </MemoryRouter>
    );

    expect(screen.getByText('Component Basics')).toBeInTheDocument();
    expect(screen.getByText('Props Basics')).toBeInTheDocument();
    expect(screen.getByText('List & Keys Basics')).toBeInTheDocument();
  });
});