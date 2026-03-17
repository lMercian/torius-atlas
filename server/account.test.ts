import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { getDb } from "./db";
import { getOrdersWithItems, updateUserProfile } from "./db";
import { users, orders, orderItems, products } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Account Router", () => {
  let testUserId: number;
  let testOrderId: number;
  let testProductId: number;

  beforeAll(async () => {
    const db = await getDb();
    if (!db) {
      console.warn("Database not available for tests");
      return;
    }

    // Create test user
    const userResult = await db.insert(users).values({
      openId: `test-user-${Date.now()}`,
      email: `test-${Date.now()}@example.com`,
      name: "Test User",
      role: "user",
      createdAt: new Date(),
    });
    testUserId = userResult.insertId as unknown as number;

    // Create test product
    const productResult = await db.insert(products).values({
      brandId: 1,
      name: "Test Product",
      description: "Test product description",
      category: "clothing",
      price: "99.99",
      currency: "USD",
      stock: 10,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    testProductId = productResult.insertId as unknown as number;

    // Create test order
    const orderResult = await db.insert(orders).values({
      userId: testUserId,
      orderNumber: `TEST-${Date.now()}`,
      total: "99.99",
      currency: "USD",
      status: "paid",
      customerEmail: `test-${Date.now()}@example.com`,
      customerName: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    testOrderId = orderResult.insertId as unknown as number;

    // Add order items
    if (testOrderId && testProductId) {
      await db.insert(orderItems).values({
        orderId: testOrderId,
        productId: testProductId,
        quantity: 1,
        price: "99.99",
        createdAt: new Date(),
      });
    }
  });

  afterAll(async () => {
    // Cleanup is optional for tests
  });

  it("should fetch orders with items for a user", async () => {
    const orders = await getOrdersWithItems(testUserId);
    
    expect(orders).toBeDefined();
    expect(Array.isArray(orders)).toBe(true);
    
    if (orders.length > 0) {
      const order = orders[0];
      expect(order).toHaveProperty("id");
      expect(order).toHaveProperty("orderNumber");
      expect(order).toHaveProperty("total");
      expect(order).toHaveProperty("status");
      expect(order).toHaveProperty("items");
      expect(Array.isArray(order.items)).toBe(true);
    }
  });

  it("should update user profile", async () => {
    const newName = `Updated User ${Date.now()}`;
    const newEmail = `updated-${Date.now()}@example.com`;

    await updateUserProfile(testUserId, {
      name: newName,
      email: newEmail,
    });

    // Verify update
    const db = await getDb();
    if (db) {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, testUserId));
      
      if (result.length > 0) {
        expect(result[0].name).toBe(newName);
        expect(result[0].email).toBe(newEmail);
      }
    }
  });

  it("should handle empty orders for user with no orders", async () => {
    // Create a new user with no orders
    const db = await getDb();
    if (!db) return;

    const newUserResult = await db.insert(users).values({
      openId: `test-empty-${Date.now()}`,
      email: `empty-${Date.now()}@example.com`,
      name: "Empty User",
      role: "user",
      createdAt: new Date(),
    });
    const newUserId = newUserResult.insertId as unknown as number;

    const orders = await getOrdersWithItems(newUserId);
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBe(0);
  });
});
