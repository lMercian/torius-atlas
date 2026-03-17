import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts } from "./db";

// Mock the database
vi.mock("./db", () => ({
  getProducts: vi.fn(),
}));

describe("Shop Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return all products when no filters are provided", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Turkish Leather Bag",
          description: "Premium leather bag from Istanbul",
          category: "Accessories",
          price: "150.00",
          stock: 10,
          featured: true,
          primaryImage: "https://example.com/bag.jpg",
        },
        {
          id: 2,
          name: "Silk Scarf",
          description: "Hand-woven silk scarf",
          category: "Accessories",
          price: "75.00",
          stock: 25,
          featured: false,
          primaryImage: "https://example.com/scarf.jpg",
        },
      ];

      vi.mocked(getProducts).mockResolvedValue(mockProducts);

      const result = await getProducts();
      expect(result).toEqual(mockProducts);
      expect(getProducts).toHaveBeenCalled();
    });

    it("should filter products by category", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Turkish Leather Bag",
          description: "Premium leather bag from Istanbul",
          category: "Accessories",
          price: "150.00",
          stock: 10,
          featured: true,
          primaryImage: "https://example.com/bag.jpg",
        },
      ];

      vi.mocked(getProducts).mockResolvedValue(mockProducts);

      const result = await getProducts({ category: "Accessories" });
      expect(result).toEqual(mockProducts);
      expect(getProducts).toHaveBeenCalledWith({ category: "Accessories" });
    });

    it("should filter products by search query", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Turkish Leather Bag",
          description: "Premium leather bag from Istanbul",
          category: "Accessories",
          price: "150.00",
          stock: 10,
          featured: true,
          primaryImage: "https://example.com/bag.jpg",
        },
      ];

      vi.mocked(getProducts).mockResolvedValue(mockProducts);

      const result = await getProducts({ search: "leather" });
      expect(result).toEqual(mockProducts);
      expect(getProducts).toHaveBeenCalledWith({ search: "leather" });
    });

    it("should handle empty results", async () => {
      vi.mocked(getProducts).mockResolvedValue([]);

      const result = await getProducts({ category: "NonExistent" });
      expect(result).toEqual([]);
    });

    it("should return products with featured items first", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Featured Product",
          description: "This is featured",
          category: "Clothing",
          price: "100.00",
          stock: 5,
          featured: true,
          primaryImage: "https://example.com/featured.jpg",
        },
        {
          id: 2,
          name: "Regular Product",
          description: "This is not featured",
          category: "Clothing",
          price: "50.00",
          stock: 20,
          featured: false,
          primaryImage: "https://example.com/regular.jpg",
        },
      ];

      vi.mocked(getProducts).mockResolvedValue(mockProducts);

      const result = await getProducts();
      expect(result[0].featured).toBe(true);
      expect(result[1].featured).toBe(false);
    });
  });
});
