import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  category?: string;
}

const CART_STORAGE_KEY = "torius-cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isLoaded]);

  // Add item to cart
  const addItem = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        // If item already exists, increase quantity
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      // Add new item
      return [...prevCart, item];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((itemId: number) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  // Get cart item count
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isLoaded,
  };
}
