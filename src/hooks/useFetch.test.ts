import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFetch } from '@/hooks/useFetch';

describe('useFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should initialize with correct default values', () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => null
    });
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('/test-url', { signal: expect.any(AbortSignal) });
  });

  it('should handle HTTP errors correctly', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('HTTP 404');
  });

  it('should handle network errors correctly', async () => {
    const errorMessage = 'Network Error';
    global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error objects as errors', async () => {
    const errorValue = 'String error';
    global.fetch = vi.fn().mockRejectedValue(errorValue);
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorValue);
  });

  it('should ignore AbortError', async () => {
    const abortError = { name: 'AbortError', message: 'Request aborted' };
    global.fetch = vi.fn().mockRejectedValue(abortError);
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull(); // Should not set error for aborted requests
  });

  it('should refetch data when refetch is called', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Clear the mock to track new calls
    vi.mocked(global.fetch).mockClear();
    
    // Call refetch
    result.current.refetch();
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should fetch new data when URL changes', async () => {
    const mockData1 = { id: 1, name: 'Test1' };
    const mockData2 = { id: 2, name: 'Test2' };
    
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData1
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData2
      });
    
    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
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
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(1, '/test-url-1', { signal: expect.any(AbortSignal) });
    expect(global.fetch).toHaveBeenNthCalledWith(2, '/test-url-2', { signal: expect.any(AbortSignal) });
  });

  it('should set loading to true during fetch', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    global.fetch = vi.fn().mockReturnValue(promise);
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    expect(result.current.loading).toBe(true);
    
    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ test: 'data' })
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle JSON parsing errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      }
    });
    
    const { result } = renderHook(() => useFetch('/test-url'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Invalid JSON');
  });
});