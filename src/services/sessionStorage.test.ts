import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load, save, add, update, remove } from '@/services/sessionStorage';
import type { Destination } from '@/types/destination';

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('sessionStorage Service', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('load', () => {
    it('should load destinations from sessionStorage', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));

      const result = load();

      expect(result).toEqual(mockDestinations);
      expect(sessionStorageMock.getItem).toHaveBeenCalledWith('destinations');
    });

    it('should return empty array when sessionStorage is empty', () => {
      sessionStorageMock.getItem.mockReturnValue(null);

      const result = load();

      expect(result).toEqual([]);
    });

    it('should return empty array when sessionStorage contains invalid JSON', () => {
      sessionStorageMock.getItem.mockReturnValue('invalid json');

      const result = load();

      expect(result).toEqual([]);
    });

    it('should return empty array when sessionStorage contains non-array data', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify({ not: 'array' }));

      const result = load();

      expect(result).toEqual([]);
    });

    it('should handle sessionStorage access errors gracefully', () => {
      sessionStorageMock.getItem.mockImplementation(() => {
        throw new Error('sessionStorage access denied');
      });

      const result = load();

      expect(result).toEqual([]);
    });
  });

  describe('save', () => {
    it('should save destinations to sessionStorage', () => {
      save(mockDestinations);

      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(mockDestinations));
    });

    it('should save empty array to sessionStorage', () => {
      save([]);

      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', '[]');
    });
  });

  describe('add', () => {
    it('should add new destination with auto-generated ID', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
      const result = add(newDestination);

      const expectedResult = [...mockDestinations, { id: 3, ...newDestination }];
      expect(result).toEqual(expectedResult);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should add first destination with ID 1 when storage is empty', () => {
      sessionStorageMock.getItem.mockReturnValue('[]');
      
      const newDestination = { name: 'Moon', description: "Earth's natural satellite" };
      const result = add(newDestination);

      const expectedResult = [{ id: 1, ...newDestination }];
      expect(result).toEqual(expectedResult);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should generate correct ID when existing items have non-sequential IDs', () => {
      const irregularDestinations = [
        { id: 5, name: 'Moon', description: "Earth's natural satellite" },
        { id: 10, name: 'Mars', description: 'The red planet' }
      ];
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(irregularDestinations));
      
      const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
      const result = add(newDestination);

      expect(result[2].id).toBe(11); // Should be max(5, 10) + 1
    });
  });

  describe('update', () => {
    it('should update existing destination', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const updatePayload = { description: 'Updated description' };
      const result = update(1, updatePayload);

      const expectedResult = [
        { id: 1, name: 'Moon', description: 'Updated description' },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ];
      expect(result).toEqual(expectedResult);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should not modify destinations when ID does not exist', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const updatePayload = { description: 'Updated description' };
      const result = update(999, updatePayload);

      expect(result).toEqual(mockDestinations);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(mockDestinations));
    });

    it('should handle partial updates', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const updatePayload = { name: 'Updated Moon' };
      const result = update(1, updatePayload);

      const expectedResult = [
        { id: 1, name: 'Updated Moon', description: "Earth's natural satellite" },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ];
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove existing destination', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const result = remove(1);

      const expectedResult = [{ id: 2, name: 'Mars', description: 'The red planet' }];
      expect(result).toEqual(expectedResult);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should not modify destinations when ID does not exist', () => {
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const result = remove(999);

      expect(result).toEqual(mockDestinations);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(mockDestinations));
    });

    it('should handle removing from empty array', () => {
      sessionStorageMock.getItem.mockReturnValue('[]');
      
      const result = remove(1);

      expect(result).toEqual([]);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('destinations', '[]');
    });
  });

  describe('ID handling', () => {
    it('should handle destinations with string IDs', () => {
      const destinationsWithStringIds = [
        { id: '1', name: 'Moon', description: "Earth's natural satellite" },
        { id: '2', name: 'Mars', description: 'The red planet' }
      ];
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(destinationsWithStringIds));
      
      const result = update(1, { description: 'Updated' });

      expect(result[0].description).toBe('Updated');
    });

    it('should handle destinations with missing IDs', () => {
      const destinationsWithMissingIds = [
        { name: 'Moon', description: "Earth's natural satellite" },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ];
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(destinationsWithMissingIds));
      
      const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
      const result = add(newDestination);

      expect(result[2].id).toBe(3); // Should be max(0, 2) + 1
    });
  });
});