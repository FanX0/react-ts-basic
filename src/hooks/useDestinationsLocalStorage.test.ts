import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDestinationsLocalStorage } from '@/hooks/useDestinationsLocalStorage';
import * as localStorage from '@/services/localStorage';
import type { Destination } from '@/types/destination';

// Mock the localStorage service
vi.mock('@/services/localStorage');
const mockedLocalStorage = vi.mocked(localStorage);

describe('useDestinationsLocalStorage', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    mockedLocalStorage.load.mockReturnValue([]);
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.create).toBe('function');
    expect(typeof result.current.update).toBe('function');
    expect(typeof result.current.remove).toBe('function');
  });

  it('should load destinations on mount', () => {
    mockedLocalStorage.load.mockReturnValue(mockDestinations);
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    expect(result.current.items).toEqual(mockDestinations);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(mockedLocalStorage.load).toHaveBeenCalledTimes(1);
  });

  it('should handle loading error', () => {
    const errorMessage = 'Failed to load from localStorage';
    mockedLocalStorage.load.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('should handle non-Error objects as errors', () => {
    const errorValue = 'String error';
    mockedLocalStorage.load.mockImplementation(() => {
      throw errorValue;
    });
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    expect(result.current.error).toBe('Unknown error');
  });

  it('should refresh destinations', () => {
    const updatedDestinations = [...mockDestinations, { id: 3, name: 'Europa', description: 'Icy moon of Jupiter' }];
    mockedLocalStorage.load
      .mockReturnValueOnce(mockDestinations)
      .mockReturnValueOnce(updatedDestinations);
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    expect(result.current.items).toEqual(mockDestinations);
    
    act(() => {
      result.current.refresh();
    });
    
    expect(result.current.items).toEqual(updatedDestinations);
    expect(mockedLocalStorage.load).toHaveBeenCalledTimes(2);
  });

  it('should create a new destination', () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const createdDestination = { id: 3, ...newDestination };
    const updatedList = [...mockDestinations, createdDestination];
    
    mockedLocalStorage.load.mockReturnValue(mockDestinations);
    mockedLocalStorage.add.mockReturnValue(updatedList);
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    act(() => {
      result.current.create(newDestination);
    });
    
    expect(result.current.items).toEqual(updatedList);
    expect(mockedLocalStorage.add).toHaveBeenCalledWith(newDestination);
  });

  it('should update a destination', () => {
    const updatePayload = { description: 'Updated description' };
    const updatedDestination = { ...mockDestinations[0], ...updatePayload };
    const updatedList = [updatedDestination, mockDestinations[1]];
    
    mockedLocalStorage.load.mockReturnValue(mockDestinations);
    mockedLocalStorage.update.mockReturnValue(updatedList);
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    act(() => {
      result.current.update(1, updatePayload);
    });
    
    expect(result.current.items).toEqual(updatedList);
    expect(mockedLocalStorage.update).toHaveBeenCalledWith(1, updatePayload);
  });

  it('should remove a destination', () => {
    const updatedList = [mockDestinations[1]]; // Remove first item
    
    mockedLocalStorage.load.mockReturnValue(mockDestinations);
    mockedLocalStorage.remove.mockReturnValue(updatedList);
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    act(() => {
      result.current.remove(1);
    });
    
    expect(result.current.items).toEqual(updatedList);
    expect(mockedLocalStorage.remove).toHaveBeenCalledWith(1);
  });

  it('should set loading state correctly during refresh', () => {
    let loadCallCount = 0;
    mockedLocalStorage.load.mockImplementation(() => {
      loadCallCount++;
      if (loadCallCount === 1) {
        // First call (mount)
        return mockDestinations;
      }
      // Simulate delay for refresh call
      return mockDestinations;
    });
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
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
    mockedLocalStorage.load
      .mockReturnValueOnce(mockDestinations) // Initial load succeeds
      .mockImplementationOnce(() => { // Refresh fails
        throw new Error(errorMessage);
      });
    
    const { result } = renderHook(() => useDestinationsLocalStorage());
    
    expect(result.current.items).toEqual(mockDestinations);
    expect(result.current.error).toBeNull();
    
    act(() => {
      result.current.refresh();
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });
});