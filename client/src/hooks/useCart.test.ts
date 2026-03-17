import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCart, CartItem } from "./useCart";

describe("useCart Hook", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart());
    
    expect(result.current.cart).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart());
    
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "99.99",
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(item);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(99.99);
  });

  it("should increase quantity when adding duplicate item", () => {
    const { result } = renderHook(() => useCart());
    
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "50.00",
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem({ ...item, quantity: 2 });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(3);
    expect(result.current.itemCount).toBe(3);
    expect(result.current.total).toBe(150.00);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart());
    
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "99.99",
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.removeItem(1);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it("should update item quantity", () => {
    const { result } = renderHook(() => useCart());
    
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "50.00",
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
    expect(result.current.itemCount).toBe(5);
    expect(result.current.total).toBe(250.00);
  });

  it("should remove item when quantity is set to 0", () => {
    const { result } = renderHook(() => useCart());
    
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "99.99",
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it("should clear entire cart", () => {
    const { result } = renderHook(() => useCart());
    
    const item1: CartItem = {
      id: 1,
      name: "Product 1",
      price: "50.00",
      quantity: 1,
    };
    
    const item2: CartItem = {
      id: 2,
      name: "Product 2",
      price: "75.00",
      quantity: 2,
    };

    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it("should persist cart to localStorage", () => {
    const { result } = renderHook(() => useCart());
    
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "99.99",
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
    });

    const savedCart = JSON.parse(localStorage.getItem("torius-cart") || "[]");
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].id).toBe(1);
  });

  it("should load cart from localStorage on mount", () => {
    const item: CartItem = {
      id: 1,
      name: "Test Product",
      price: "99.99",
      quantity: 2,
    };

    localStorage.setItem("torius-cart", JSON.stringify([item]));

    const { result } = renderHook(() => useCart());

    // Wait for useEffect to complete
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(1);
    expect(result.current.itemCount).toBe(2);
  });
});
