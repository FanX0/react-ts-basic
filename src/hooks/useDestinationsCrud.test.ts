import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDestinationsCrud } from '@/hooks/useDestinationsCrud';
import * as api from '@/services/api';
import type { Destination } from '@/types/destination';

// Mock the API service
vi.mock('@/services/api');
const mockedApi = vi.mocked(api);

describe('useDestinationsCrud', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    mockedApi.listDestinations.mockResolvedValue([]);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.create).toBe('function');
    expect(typeof result.current.update).toBe('function');
    expect(typeof result.current.remove).toBe('function');
  });

  it('should load destinations on mount', async () => {
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.items).toEqual(mockDestinations);
    expect(result.current.error).toBeNull();
    expect(mockedApi.listDestinations).toHaveBeenCalledTimes(1);
  });

  it('should handle loading error', async () => {
    const errorMessage = 'Failed to load destinations';
    mockedApi.listDestinations.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should refresh destinations', async () => {
    const updatedDestinations = [...mockDestinations, { id: 3, name: 'Europa', description: 'Icy moon of Jupiter' }];
    mockedApi.listDestinations
      .mockResolvedValueOnce(mockDestinations)
      .mockResolvedValueOnce(updatedDestinations);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.items).toEqual(mockDestinations);
    
    await act(async () => {
      await result.current.refresh();
    });
    
    expect(result.current.items).toEqual(updatedDestinations);
    expect(mockedApi.listDestinations).toHaveBeenCalledTimes(2);
  });

  it('should create a new destination', async () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const createdDestination = { id: 3, ...newDestination };
    
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    mockedApi.createDestination.mockResolvedValue(createdDestination);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.create(newDestination);
    });
    
    expect(result.current.items).toEqual([...mockDestinations, createdDestination]);
    expect(mockedApi.createDestination).toHaveBeenCalledWith(newDestination);
  });

  it('should handle create error and refresh', async () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const errorMessage = 'Failed to create destination';
    
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    mockedApi.createDestination.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.create(newDestination);
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(mockedApi.listDestinations).toHaveBeenCalledTimes(2); // Initial load + refresh after error
  });

  it('should update a destination', async () => {
    const updatePayload = { description: 'Updated description' };
    const updatedDestination = { ...mockDestinations[0], ...updatePayload };
    
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    mockedApi.updateDestination.mockResolvedValue(updatedDestination);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.update(1, updatePayload);
    });
    
    expect(result.current.items[0]).toEqual(updatedDestination);
    expect(result.current.items[1]).toEqual(mockDestinations[1]); // Other items unchanged
    expect(mockedApi.updateDestination).toHaveBeenCalledWith(1, updatePayload);
  });

  it('should handle update error and refresh', async () => {
    const updatePayload = { description: 'Updated description' };
    const errorMessage = 'Failed to update destination';
    
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    mockedApi.updateDestination.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.update(1, updatePayload);
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
    expect(mockedApi.listDestinations).toHaveBeenCalledTimes(2); // Initial load + refresh after error
  });

  it('should remove a destination', async () => {
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    mockedApi.deleteDestination.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.remove(1);
    });
    
    expect(result.current.items).toEqual([mockDestinations[1]]);
    expect(mockedApi.deleteDestination).toHaveBeenCalledWith(1);
  });

  it('should handle remove error and refresh', async () => {
    const errorMessage = 'Failed to delete destination';
    
    mockedApi.listDestinations.mockResolvedValue(mockDestinations);
    mockedApi.deleteDestination.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.remove(1);
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
    expect(mockedApi.listDestinations).toHaveBeenCalledTimes(2); // Initial load + refresh after error
  });

  it('should handle non-Error objects as errors', async () => {
    const errorValue = 'String error';
    mockedApi.listDestinations.mockRejectedValue(errorValue);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe(errorValue);
  });

  it('should set loading state correctly during operations', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    mockedApi.listDestinations.mockReturnValue(promise);
    
    const { result } = renderHook(() => useDestinationsCrud());
    
    expect(result.current.loading).toBe(true);
    
    // Resolve the promise
    resolvePromise!(mockDestinations);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});