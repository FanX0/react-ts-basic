import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { useAxios } from '@/hooks/useAxios';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('useAxios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    mockedAxios.get.mockResolvedValue({ data: null });
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockedAxios.get.mockResolvedValue({ data: mockData });
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledWith('/test-url', { signal: expect.any(AbortSignal) });
  });

  it('should handle errors correctly', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error objects as errors', async () => {
    const errorValue = 'String error';
    mockedAxios.get.mockRejectedValue(errorValue);
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorValue);
  });

  it('should ignore canceled/aborted errors', async () => {
    const canceledError = { name: 'CanceledError', message: 'Request canceled' };
    mockedAxios.get.mockRejectedValue(canceledError);
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull(); // Should not set error for canceled requests
  });

  it('should refetch data when refetch is called', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockedAxios.get.mockResolvedValue({ data: mockData });
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Clear the mock to track new calls
    mockedAxios.get.mockClear();
    
    // Call refetch
    result.current.refetch();
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('should fetch new data when URL changes', async () => {
    const mockData1 = { id: 1, name: 'Test1' };
    const mockData2 = { id: 2, name: 'Test2' };
    
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockData1 })
      .mockResolvedValueOnce({ data: mockData2 });
    
    const { result, rerender } = renderHook(
      ({ url }) => useAxios(url),
      { initialProps: { url: '/test-url-1' } }
    );
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData1);
    
    // Change URL
    rerender({ url: '/test-url-2' });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData2);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, '/test-url-1', { signal: expect.any(AbortSignal) });
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, '/test-url-2', { signal: expect.any(AbortSignal) });
  });

  it('should set loading to true during fetch', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    mockedAxios.get.mockReturnValue(promise);
    
    const { result } = renderHook(() => useAxios('/test-url'));
    
    expect(result.current.loading).toBe(true);
    
    // Resolve the promise
    resolvePromise!({ data: { test: 'data' } });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});