import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listDestinations, createDestination, updateDestination, deleteDestination } from '@/services/api.axios';
import http from '@/services/http';
import type { Destination } from '@/types/destination';

// Mock the http service
vi.mock('@/services/http');
const mockedHttp = vi.mocked(http);

describe('API Axios Service', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    
    // Reset environment variables
    (import.meta as any).env = {
      VITE_USE_STATIC_DATA: 'false',
      BASE_URL: '/'
    };
  });

  describe('listDestinations', () => {
    it('should fetch destinations from API when not using static data', async () => {
      mockedHttp.get.mockResolvedValue({ data: mockDestinations });

      const result = await listDestinations();

      expect(result).toEqual(mockDestinations);
      expect(mockedHttp.get).toHaveBeenCalledWith('/destinations');
    });

    it('should fetch destinations from static data when USE_STATIC is true', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";

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
            const res = await http.get("/destinations");
            return res.data;
          }
        };
      });
      
      const { listDestinations: listDestinationsStatic } = await import('@/services/api.axios');
      
      const staticData = {
        destinations: [
          { name: 'Moon', description: "Earth's natural satellite" },
          { name: 'Mars', description: 'The red planet' }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => staticData
      });

      const result = await listDestinationsStatic();

      expect(result).toEqual([
        { id: 1, name: 'Moon', description: "Earth's natural satellite" },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ]);
      expect(global.fetch).toHaveBeenCalledWith('/data.json');
      expect(mockedHttp.get).not.toHaveBeenCalled();
      
      vi.doUnmock('@/services/api.axios');
    });

    it('should handle empty destinations array in static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";

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
            const res = await http.get("/destinations");
            return res.data;
          }
        };
      });
      
      const { listDestinations: listDestinationsEmpty } = await import('@/services/api.axios');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({})
      });

      const result = await listDestinationsEmpty();

      expect(result).toEqual([]);
      
      vi.doUnmock('@/services/api.axios');
    });

    it('should throw error when static data request fails', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";

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
            const res = await http.get("/destinations");
            return res.data;
          }
        };
      });
      
      const { listDestinations: listDestinationsError } = await import('@/services/api.axios');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(listDestinationsError()).rejects.toThrow('HTTP 404');
      
      vi.doUnmock('@/services/api.axios');
    });

    it('should use custom base path for static data when provided', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/custom-path/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";

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
            const res = await http.get("/destinations");
            return res.data;
          }
        };
      });
      
      const { listDestinations: listDestinationsCustom } = await import('@/services/api.axios');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ destinations: [] })
      });

      await listDestinationsCustom();

      expect(global.fetch).toHaveBeenCalledWith('/custom-path/data.json');
      
      vi.doUnmock('@/services/api.axios');
    });
  });

  describe('createDestination', () => {
    const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
    const createdDestination = { id: 3, ...newDestination };

    it('should create destination when not using static data', async () => {
      mockedHttp.post.mockResolvedValue({ data: createdDestination });

      const result = await createDestination(newDestination);

      expect(result).toEqual(createdDestination);
      expect(mockedHttp.post).toHaveBeenCalledWith('/destinations', newDestination);
    });

    it('should throw error when using static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";

        return {
          ...originalModule,
          async createDestination(destination: any) {
            if (USE_STATIC) {
              throw new Error("Read-only demo: mutations disabled in production");
            }
            const res = await http.post("/destinations", destination);
            return res.data;
          }
        };
      });
      
      const { createDestination: createDestinationStatic } = await import('@/services/api.axios');

      await expect(createDestinationStatic(newDestination)).rejects.toThrow('Read-only demo: mutations disabled in production');
      expect(mockedHttp.post).not.toHaveBeenCalled();
      
      vi.doUnmock('@/services/api.axios');
    });
  });

  describe('updateDestination', () => {
    const updatePayload = { description: 'Updated description' };
    const updatedDestination = { id: 1, name: 'Moon', description: 'Updated description' };

    it('should update destination when not using static data', async () => {
      mockedHttp.patch.mockResolvedValue({ data: updatedDestination });

      const result = await updateDestination(1, updatePayload);

      expect(result).toEqual(updatedDestination);
      expect(mockedHttp.patch).toHaveBeenCalledWith('/destinations/1', updatePayload);
    });

    it('should throw error when using static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";

        return {
          ...originalModule,
          async updateDestination(id: number, destination: any) {
            if (USE_STATIC) {
              throw new Error("Read-only demo: mutations disabled in production");
            }
            const res = await http.patch(`/destinations/${id}`, destination);
            return res.data;
          }
        };
      });
      
      const { updateDestination: updateDestinationStatic } = await import('@/services/api.axios');

      await expect(updateDestinationStatic(1, updatePayload)).rejects.toThrow('Read-only demo: mutations disabled in production');
      expect(mockedHttp.patch).not.toHaveBeenCalled();
      
      vi.doUnmock('@/services/api.axios');
    });
  });

  describe('deleteDestination', () => {
    it('should delete destination when not using static data', async () => {
      mockedHttp.delete.mockResolvedValue({ data: undefined });

      await deleteDestination(1);

      expect(mockedHttp.delete).toHaveBeenCalledWith('/destinations/1');
    });

    it('should throw error when using static data', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'true',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";

        return {
          ...originalModule,
          async deleteDestination(id: number) {
            if (USE_STATIC) {
              throw new Error("Read-only demo: mutations disabled in production");
            }
            const res = await http.delete(`/destinations/${id}`);
            return res.data;
          }
        };
      });
      
      const { deleteDestination: deleteDestinationStatic } = await import('@/services/api.axios');

      await expect(deleteDestinationStatic(1)).rejects.toThrow('Read-only demo: mutations disabled in production');
      expect(mockedHttp.delete).not.toHaveBeenCalled();
      
      vi.doUnmock('@/services/api.axios');
    });
  });

  describe('environment configuration', () => {
    it('should handle case-insensitive USE_STATIC flag', async () => {
      // Mock the environment variables before importing
      vi.doMock('@/services/api.axios', async () => {
        const originalModule = await vi.importActual('@/services/api.axios');
        // Mock import.meta.env for this test
        const mockEnv = {
          VITE_USE_STATIC_DATA: 'TRUE',
          BASE_URL: '/'
        };
        
        // Create a new module with mocked environment
        const USE_STATIC = (mockEnv.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
        const BASE_PATH = mockEnv.BASE_URL || "/";

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
            const res = await http.get("/destinations");
            return res.data;
          }
        };
      });
      
      const { listDestinations: listDestinationsCase } = await import('@/services/api.axios');
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ destinations: [] })
      });

      await listDestinationsCase();

      expect(global.fetch).toHaveBeenCalledWith('/data.json');
      expect(mockedHttp.get).not.toHaveBeenCalled();
      
      vi.doUnmock('@/services/api.axios');
    });
  });
});