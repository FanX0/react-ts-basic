import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load, save, add, update, remove } from '@/services/localStorage';
import type { Destination } from '@/types/destination';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('localStorage Service', () => {
  const mockDestinations: Destination[] = [
    { id: 1, name: 'Moon', description: "Earth's natural satellite" },
    { id: 2, name: 'Mars', description: 'The red planet' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('load', () => {
    it('should load destinations from localStorage', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));

      const result = load();

      expect(result).toEqual(mockDestinations);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('destinations');
    });

    it('should return empty array when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = load();

      expect(result).toEqual([]);
    });

    it('should return empty array when localStorage contains invalid JSON', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = load();

      expect(result).toEqual([]);
    });

    it('should return empty array when localStorage contains non-array data', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({ not: 'array' }));

      const result = load();

      expect(result).toEqual([]);
    });

    it('should handle localStorage access errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage access denied');
      });

      const result = load();

      expect(result).toEqual([]);
    });
  });

  describe('save', () => {
    it('should save destinations to localStorage', () => {
      save(mockDestinations);

      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(mockDestinations));
    });

    it('should save empty array to localStorage', () => {
      save([]);

      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', '[]');
    });
  });

  describe('add', () => {
    it('should add new destination with auto-generated ID', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
      const result = add(newDestination);

      const expectedResult = [...mockDestinations, { id: 3, ...newDestination }];
      expect(result).toEqual(expectedResult);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should add first destination with ID 1 when storage is empty', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      const newDestination = { name: 'Moon', description: "Earth's natural satellite" };
      const result = add(newDestination);

      const expectedResult = [{ id: 1, ...newDestination }];
      expect(result).toEqual(expectedResult);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should generate correct ID when existing items have non-sequential IDs', () => {
      const irregularDestinations = [
        { id: 5, name: 'Moon', description: "Earth's natural satellite" },
        { id: 10, name: 'Mars', description: 'The red planet' }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(irregularDestinations));
      
      const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
      const result = add(newDestination);

      expect(result[2].id).toBe(11); // Should be max(5, 10) + 1
    });
  });

  describe('update', () => {
    it('should update existing destination', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const updatePayload = { description: 'Updated description' };
      const result = update(1, updatePayload);

      const expectedResult = [
        { id: 1, name: 'Moon', description: 'Updated description' },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ];
      expect(result).toEqual(expectedResult);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should not modify destinations when ID does not exist', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const updatePayload = { description: 'Updated description' };
      const result = update(999, updatePayload);

      expect(result).toEqual(mockDestinations);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(mockDestinations));
    });

    it('should handle partial updates', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
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
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const result = remove(1);

      const expectedResult = [{ id: 2, name: 'Mars', description: 'The red planet' }];
      expect(result).toEqual(expectedResult);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(expectedResult));
    });

    it('should not modify destinations when ID does not exist', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDestinations));
      
      const result = remove(999);

      expect(result).toEqual(mockDestinations);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', JSON.stringify(mockDestinations));
    });

    it('should handle removing from empty array', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      const result = remove(1);

      expect(result).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('destinations', '[]');
    });
  });

  describe('ID handling', () => {
    it('should handle destinations with string IDs', () => {
      const destinationsWithStringIds = [
        { id: '1', name: 'Moon', description: "Earth's natural satellite" },
        { id: '2', name: 'Mars', description: 'The red planet' }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(destinationsWithStringIds));
      
      const result = update(1, { description: 'Updated' });

      expect(result[0].description).toBe('Updated');
    });

    it('should handle destinations with missing IDs', () => {
      const destinationsWithMissingIds = [
        { name: 'Moon', description: "Earth's natural satellite" },
        { id: 2, name: 'Mars', description: 'The red planet' }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(destinationsWithMissingIds));
      
      const newDestination = { name: 'Europa', description: 'Icy moon of Jupiter' };
      const result = add(newDestination);

      expect(result[2].id).toBe(3); // Should be max(0, 2) + 1
    });
  });
});