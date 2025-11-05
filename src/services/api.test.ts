import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listDestinations, createDestination, updateDestination, deleteDestination } from '@/services/api';
import type { Destination } from '@/types/destination';

describe('API Service', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    
    // Reset environment variables
    (import.meta as any).env = {
      VITE_API_BASE_URL: 'http://localhost:3000',
      VITE_USE_STATIC_DATA: 'false',
      BASE_URL: '/'
    };
  });

  describe('listDestinations', () => {
    it('should fetch destinations from API when not using static data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDestinations
      });

      const result = await listDestinations();

      expect(result).toEqual(mockDestinations);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/destinations');
    });

    it('should use static data when USE_STATIC is true', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsStatic } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ destinations: mockDestinations })
      });

      const result = await listDestinationsStatic();

      expect(global.fetch).toHaveBeenCalledWith('/data.json');
      expect(result).toEqual([
        { id: 1, name: 'Moon', description: "Earth's natural satellite" },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ]);
      
      vi.doUnmock('@/services/api');
    });

    it('should use custom path when BASE_URL is set', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/custom-path/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsCustom } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ destinations: mockDestinations })
      });

      const result = await listDestinationsCustom();

      expect(global.fetch).toHaveBeenCalledWith('/custom-path/data.json');
      expect(result).toEqual([
        { id: 1, name: 'Moon', description: "Earth's natural satellite" },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ]);
      
      vi.doUnmock('@/services/api');
    });

    it('should handle empty destinations array in static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsEmpty } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({})
      });

      const result = await listDestinationsEmpty();

      expect(result).toEqual([]);
      
      vi.doUnmock('@/services/api');
    });

    it('should throw error when API request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(listDestinations()).rejects.toThrow('HTTP 404');
    });

    it('should throw error when static data request fails', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsFailure } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(listDestinationsFailure()).rejects.toThrow('HTTP 404');
      
      vi.doUnmock('@/services/api');
    });
  });

  describe('createDestination', () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const createdDestination = { id: 3, ...newDestination };

    it('should create destination when not using static data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => createdDestination
      });

      const result = await createDestination(newDestination);

      expect(result).toEqual(createdDestination);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDestination)
      });
    });

    it('should throw error when using static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async createDestination(destination: any) {
            if (USE_STATIC) {
              throw new Error("Read-only demo: mutations disabled in production");
            }
            const res = await fetch(`${BASE_URL}/destinations`, {
              method: "POST",
              headers,
              body: JSON.stringify(destination),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { createDestination: createDestinationStatic } = await import('@/services/api');

      await expect(createDestinationStatic(newDestination)).rejects.toThrow('Read-only demo: mutations disabled in production');
      
      vi.doUnmock('@/services/api');
    });

    it('should throw error when API request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400
      });

      await expect(createDestination(newDestination)).rejects.toThrow('HTTP 400');
    });
  });

  describe('updateDestination', () => {
    const updatePayload = { description: 'Updated description' };
    const updatedDestination = { id: 1, name: 'Moon', description: 'Updated description' };

    it('should update destination when not using static data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => updatedDestination
      });

      const result = await updateDestination(1, updatePayload);

      expect(result).toEqual(updatedDestination);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/destinations/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
    });

    it('should throw error when using static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async updateDestination(id: number, destination: any) {
            if (USE_STATIC) {
              throw new Error("Read-only demo: mutations disabled in production");
            }
            const res = await fetch(`${BASE_URL}/destinations/${id}`, {
              method: "PATCH",
              headers,
              body: JSON.stringify(destination),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { updateDestination: updateDestinationStatic } = await import('@/services/api');

      await expect(updateDestinationStatic(1, updatePayload)).rejects.toThrow('Read-only demo: mutations disabled in production');
      
      vi.doUnmock('@/services/api');
    });

    it('should throw error when API request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(updateDestination(1, updatePayload)).rejects.toThrow('HTTP 404');
    });
  });

  describe('deleteDestination', () => {
    it('should delete destination when not using static data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true
      });

      await deleteDestination(1);

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/destinations/1', {
        method: 'DELETE'
      });
    });

    it('should throw error when using static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async deleteDestination(id: number) {
            if (USE_STATIC) {
              throw new Error("Read-only demo: mutations disabled in production");
            }
            const res = await fetch(`${BASE_URL}/destinations/${id}`, {
              method: "DELETE",
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
          }
        };
      });
      
      const { deleteDestination: deleteDestinationStatic } = await import('@/services/api');

      await expect(deleteDestinationStatic(1)).rejects.toThrow('Read-only demo: mutations disabled in production');
      
      vi.doUnmock('@/services/api');
    });

    it('should throw error when API request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(deleteDestination(1)).rejects.toThrow('HTTP 404');
    });
  });

  describe('environment configuration', () => {
    it('should use custom API base URL when provided', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'https://api.example.com',
          VITE_USE_STATIC_DATA: 'false',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsCustom } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDestinations
      });

      await listDestinationsCustom();

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/destinations');
      
      vi.doUnmock('@/services/api');
    });

    it('should use custom base path for static data when provided', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/custom-path/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsCustomPath } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ destinations: [] })
      });

      await listDestinationsCustomPath();

      expect(global.fetch).toHaveBeenCalledWith('/custom-path/data.json');
      
      vi.doUnmock('@/services/api');
    });

    it('should handle case-insensitive USE_STATIC flag', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api', async () => {
        const originalModule = await vi.importActual('@/services/api');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_API_BASE_URL: 'http://localhost:3000',
          VITE_USE_STATIC_DATA: 'TRUE',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const BASE_URL = mockEnv.VITE_API_BASE_URL || "http://localhost:3000";
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";
        const headers = { "Content-Type": "application/json" };

        return {
          ...originalModule,
          async listDestinations() {
            if (USE_STATIC) {
              const res = await fetch(`${BASE_PATH}data.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              const arr = (json?.destinations ?? []) as Array<any>;
              return arr.map((d: any, i: number) => ({ id: i + 1, ...d }));
            }
            const res = await fetch(`${BASE_URL}/destinations`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }
        };
      });
      
      const { listDestinations: listDestinationsCaseInsensitive } = await import('@/services/api');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ destinations: [] })
      });

      await listDestinationsCaseInsensitive();

      expect(global.fetch).toHaveBeenCalledWith('/data.json');
      
      vi.doUnmock('@/services/api');
    });
  });
});