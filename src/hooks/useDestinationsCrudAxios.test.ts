import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDestinationsCrudAxios } from '@/hooks/useDestinationsCrudAxios';
import * as apiAxios from '@/services/api.axios';
import type { Destination } from '@/types/destination';

// Mock the API service
vi.mock('@/services/api.axios');
const mockedApiAxios = vi.mocked(apiAxios);

describe('useDestinationsCrudAxios', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    mockedApiAxios.listDestinations.mockResolvedValue([]);
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.create).toBe('function');
    expect(typeof result.current.update).toBe('function');
    expect(typeof result.current.remove).toBe('function');
  });

  it('should load destinations on mount', async () => {
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.items).toEqual(mockDestinations);
    expect(result.current.error).toBeNull();
    expect(mockedApiAxios.listDestinations).toHaveBeenCalledTimes(1);
  });

  it('should handle loading error', async () => {
    const errorMessage = 'Failed to load destinations';
    mockedApiAxios.listDestinations.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should create a new destination', async () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const createdDestination = { id: 3, ...newDestination };
    
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    mockedApiAxios.createDestination.mockResolvedValue(createdDestination);
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.create(newDestination);
    });
    
    expect(result.current.items).toEqual([...mockDestinations, createdDestination]);
    expect(mockedApiAxios.createDestination).toHaveBeenCalledWith(newDestination);
  });

  it('should update a destination', async () => {
    const updatePayload = { description: 'Updated description' };
    const updatedDestination = { ...mockDestinations[0], ...updatePayload };
    
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    mockedApiAxios.updateDestination.mockResolvedValue(updatedDestination);
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.update(1, updatePayload);
    });
    
    expect(result.current.items[0]).toEqual(updatedDestination);
    expect(mockedApiAxios.updateDestination).toHaveBeenCalledWith(1, updatePayload);
  });

  it('should remove a destination', async () => {
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    mockedApiAxios.deleteDestination.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.remove(1);
    });
    
    expect(result.current.items).toEqual([mockDestinations[1]]);
    expect(mockedApiAxios.deleteDestination).toHaveBeenCalledWith(1);
  });

  it('should handle create error and refresh', async () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const errorMessage = 'Failed to create destination';
    
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    mockedApiAxios.createDestination.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.create(newDestination);
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(mockedApiAxios.listDestinations).toHaveBeenCalledTimes(2);
  });

  it('should handle update error and refresh', async () => {
    const updatePayload = { description: 'Updated description' };
    const errorMessage = 'Failed to update destination';
    
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    mockedApiAxios.updateDestination.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.update(1, updatePayload);
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
    expect(mockedApiAxios.listDestinations).toHaveBeenCalledTimes(2);
  });

  it('should handle remove error and refresh', async () => {
    const errorMessage = 'Failed to delete destination';
    
    mockedApiAxios.listDestinations.mockResolvedValue(mockDestinations);
    mockedApiAxios.deleteDestination.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useDestinationsCrudAxios());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.remove(1);
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
    expect(mockedApiAxios.listDestinations).toHaveBeenCalledTimes(2);
  });
});