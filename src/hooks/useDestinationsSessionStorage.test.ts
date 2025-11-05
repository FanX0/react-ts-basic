import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDestinationsSessionStorage } from '@/hooks/useDestinationsSessionStorage';
import * as sessionStorage from '@/services/sessionStorage';
import type { Destination } from '@/types/destination';

// Mock the sessionStorage service
vi.mock('@/services/sessionStorage');
const mockedSessionStorage = vi.mocked(sessionStorage);

describe('useDestinationsSessionStorage', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    mockedSessionStorage.load.mockReturnValue([]);
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.create).toBe('function');
    expect(typeof result.current.update).toBe('function');
    expect(typeof result.current.remove).toBe('function');
  });

  it('should load destinations on mount', () => {
    mockedSessionStorage.load.mockReturnValue(mockDestinations);
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    expect(result.current.items).toEqual(mockDestinations);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(mockedSessionStorage.load).toHaveBeenCalledTimes(1);
  });

  it('should handle loading error', () => {
    const errorMessage = 'Failed to load from sessionStorage';
    mockedSessionStorage.load.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('should handle non-Error objects as errors', () => {
    const errorValue = 'String error';
    mockedSessionStorage.load.mockImplementation(() => {
      throw errorValue;
    });
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    expect(result.current.error).toBe('Unknown error');
  });

  it('should refresh destinations', () => {
    const updatedDestinations = [...mockDestinations, { id: 3, name: 'Europa', description: 'Icy moon of Jupiter' }];
    mockedSessionStorage.load
      .mockReturnValueOnce(mockDestinations)
      .mockReturnValueOnce(updatedDestinations);
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    expect(result.current.items).toEqual(mockDestinations);
    
    act(() => {
      result.current.refresh();
    });
    
    expect(result.current.items).toEqual(updatedDestinations);
    expect(mockedSessionStorage.load).toHaveBeenCalledTimes(2);
  });

  it('should create a new destination', () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const createdDestination = { id: 3, ...newDestination };
    const updatedList = [...mockDestinations, createdDestination];
    
    mockedSessionStorage.load.mockReturnValue(mockDestinations);
    mockedSessionStorage.add.mockReturnValue(updatedList);
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    act(() => {
      result.current.create(newDestination);
    });
    
    expect(result.current.items).toEqual(updatedList);
    expect(mockedSessionStorage.add).toHaveBeenCalledWith(newDestination);
  });

  it('should update a destination', () => {
    const updatePayload = { description: 'Updated description' };
    const updatedDestination = { ...mockDestinations[0], ...updatePayload };
    const updatedList = [updatedDestination, mockDestinations[1]];
    
    mockedSessionStorage.load.mockReturnValue(mockDestinations);
    mockedSessionStorage.update.mockReturnValue(updatedList);
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    act(() => {
      result.current.update(1, updatePayload);
    });
    
    expect(result.current.items).toEqual(updatedList);
    expect(mockedSessionStorage.update).toHaveBeenCalledWith(1, updatePayload);
  });

  it('should remove a destination', () => {
    const updatedList = [mockDestinations[1]]; // Remove first item
    
    mockedSessionStorage.load.mockReturnValue(mockDestinations);
    mockedSessionStorage.remove.mockReturnValue(updatedList);
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    act(() => {
      result.current.remove(1);
    });
    
    expect(result.current.items).toEqual(updatedList);
    expect(mockedSessionStorage.remove).toHaveBeenCalledWith(1);
  });

  it('should set loading state correctly during refresh', () => {
    let loadCallCount = 0;
    mockedSessionStorage.load.mockImplementation(() => {
      loadCallCount++;
      if (loadCallCount === 1) {
        // First call (mount)
        return mockDestinations;
      }
      // Simulate delay for refresh call
      return mockDestinations;
    });
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    // Initial load should complete immediately
    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(mockDestinations);
    
    // Refresh should temporarily set loading to true
    act(() => {
      result.current.refresh();
    });
    
    expect(result.current.loading).toBe(false); // Synchronous operation completes immediately
    expect(result.current.items).toEqual(mockDestinations);
  });

  it('should handle refresh error', () => {
    const errorMessage = 'Refresh failed';
    mockedSessionStorage.load
      .mockReturnValueOnce(mockDestinations) // Initial load succeeds
      .mockImplementationOnce(() => { // Refresh fails
        throw new Error(errorMessage);
      });
    
    const { result } = renderHook(() => useDestinationsSessionStorage());
    
    expect(result.current.items).toEqual(mockDestinations);
    expect(result.current.error).toBeNull();
    
    act(() => {
      result.current.refresh();
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });
});