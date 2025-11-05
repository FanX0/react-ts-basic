import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './Home';
import * as api from '../services/api';

// Mock the API service
vi.mock('../services/api');

describe('Home', () => {
  const mockDestinations = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders home page', () => {
    vi.mocked(api.listDestinations).mockResolvedValue(mockDestinations);
    
    render(<Home />);
    
    // Check that the component renders without crashing
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.mocked(api.listDestinations).mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<Home />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls the API service', () => {
    vi.mocked(api.listDestinations).mockResolvedValue(mockDestinations);
    
    render(<Home />);
    
    expect(api.listDestinations).toHaveBeenCalled();
  });
});