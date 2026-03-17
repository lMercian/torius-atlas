import { eq, desc, like, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  events,
  brandApplications,
  contactMessages,
  newsletterSubscribers,
  products,
  productImages,
  productVideos,
  orders,
  orderItems,
  wishlists,
  InsertBrandApplication,
  InsertContactMessage,
  InsertNewsletterSubscriber,
  InsertEvent,
  Product,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).orderBy(events.startDate);
}

export async function getFeaturedEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).where(eq(events.featured, true)).orderBy(events.startDate);
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEvent(data: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(events).values(data);
}

export async function updateEvent(id: number, data: Partial<InsertEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(events).set(data).where(eq(events.id, id));
}

// ─── Brand Applications ───────────────────────────────────────────────────────

export async function createBrandApplication(data: InsertBrandApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(brandApplications).values(data);
}

export async function getAllApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(brandApplications).orderBy(desc(brandApplications.createdAt));
}

export async function getApplicationsByEvent(eventId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(brandApplications)
    .where(eq(brandApplications.eventId, eventId))
    .orderBy(desc(brandApplications.createdAt));
}

export async function updateApplicationStatus(
  id: number,
  status: "pending" | "approved" | "rejected" | "waitlisted"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(brandApplications).set({ status }).where(eq(brandApplications.id, id));
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function createContactMessage(data: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactMessages).values(data);
}

export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function markMessageRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function subscribeNewsletter(data: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(newsletterSubscribers)
    .values(data)
    .onDuplicateKeyUpdate({ set: { active: true } });
}

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.active, true))
    .orderBy(desc(newsletterSubscribers.createdAt));
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(filters?: { category?: string; search?: string }) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(products.active, true)];
  
  if (filters?.category) {
    conditions.push(eq(products.category, filters.category));
  }
  
  if (filters?.search) {
    conditions.push(like(products.name, `%${filters.search}%`));
  }

  const result = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      category: products.category,
      price: products.price,
      stock: products.stock,
      featured: products.featured,
      primaryImage: productImages.imageUrl,
    })
    .from(products)
    .leftJoin(productImages, and(
      eq(productImages.productId, products.id),
      eq(productImages.isPrimary, true)
    ))
    .where(and(...conditions))
    .orderBy(desc(products.featured), desc(products.createdAt));

  return result;
}

// ─── Product Management ───────────────────────────────────────────────────────

export async function createProduct(data: {
  brandId: number;
  name: string;
  description?: string;
  category: string;
  price: string;
  stock: number;
  featured?: boolean;
  active?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(products).values({
    ...data,
    active: data.active ?? true,
    featured: data.featured ?? false,
    createdAt: new Date(),
  });
  
  // Get the inserted ID from the result
  const insertedId = (result as any).insertId || (result as any)[0]?.insertId || 1;
  
  return {
    id: insertedId,
    ...data,
  };
}

export async function updateProduct(id: number, data: Partial<{
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  featured: boolean;
  active: boolean;
}>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set({ active: false }).where(eq(products.id, id));
}

export async function getProductsByBrand(brandId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      category: products.category,
      price: products.price,
      stock: products.stock,
      featured: products.featured,
      active: products.active,
      primaryImage: productImages.imageUrl,
    })
    .from(products)
    .leftJoin(productImages, and(
      eq(productImages.productId, products.id),
      eq(productImages.isPrimary, true)
    ))
    .where(and(eq(products.brandId, brandId), eq(products.active, true)))
    .orderBy(desc(products.createdAt));
}

export async function addProductImage(data: {
  productId: number;
  imageUrl: string;
  isPrimary: boolean;
  altText?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(productImages).values({
    productId: data.productId,
    imageUrl: data.imageUrl,
    isPrimary: data.isPrimary,
    altText: data.altText || null,
    sortOrder: 0,
  });
}

export async function getProductImages(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productImages).where(eq(productImages.productId, productId));
}

// ─── Orders (Stripe Payments) ─────────────────────────────────────────────────

export async function createOrder(data: {
  userId?: number;
  orderNumber: string;
  total: string;
  currency?: string;
  stripePaymentIntentId?: string;
  customerEmail: string;
  customerName: string;
  shippingAddress?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(orders).values({
    ...data,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  return result;
}

export async function updateOrderStatus(
  id: number,
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id));
}

export async function getOrderByStripePaymentIntentId(paymentIntentId: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.stripePaymentIntentId, paymentIntentId))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function addOrderItems(items: Array<{
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
}>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  for (const item of items) {
    await db.insert(orderItems).values({
      ...item,
      createdAt: new Date(),
    });
  }
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// ─── Account / Orders with Items ──────────────────────────────────────────────

export async function getOrdersWithItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const ordersData = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
  
  // Fetch items for each order
  const ordersWithItems = await Promise.all(
    ordersData.map(async (order) => {
      const items = await db
        .select({
          id: orderItems.id,
          orderId: orderItems.orderId,
          productId: orderItems.productId,
          quantity: orderItems.quantity,
          price: orderItems.price,
          productName: products.name,
        })
        .from(orderItems)
        .leftJoin(products, eq(orderItems.productId, products.id))
        .where(eq(orderItems.orderId, order.id));
      
      return {
        ...order,
        items,
      };
    })
  );
  
  return ordersWithItems;
}

export async function updateUserProfile(userId: number, data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // For now, we only update name and email in the users table
  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  
  if (Object.keys(updateData).length > 0) {
    await db.update(users).set(updateData).where(eq(users.id, userId));
  }
  
  // TODO: Store phone and address in a separate user_profile table if needed
}

// ─── Admin Functions ───────────────────────────────────────────────────────

import { brandAccessTokens } from "../drizzle/schema";

/**
 * Generate a secure random token for brand access
 */
function generateSecureToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Get all brands (for admin)
 */
export async function getAllBrands() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).where(eq(users.role, "user")).orderBy(desc(users.createdAt));
}

/**
 * Create a new brand and generate access token
 */
export async function createBrandWithToken(data: {
  name: string;
  email: string;
  description?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Create brand user
  await db
    .insert(users)
    .values({
      openId: `brand_${Date.now()}_${Math.random().toString().substring(2)}`,
      name: data.name,
      email: data.email,
      role: "user",
      loginMethod: "brand_panel",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    });

  // Get the created brand
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  const brand = result[0];
  const brandId = brand.id;

  // Generate access token
  const token = generateSecureToken();
  await db.insert(brandAccessTokens).values({
    brandId,
    token,
    isActive: true,
    createdAt: new Date(),
  });

  return { brandId, token };
}

/**
 * Get brand access token
 */
export async function getBrandAccessToken(brandId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(brandAccessTokens)
    .where(eq(brandAccessTokens.brandId, brandId))
    .limit(1);

  return result.length > 0 ? result[0].token : null;
}

/**
 * Verify brand access token
 */
export async function verifyBrandAccessToken(token: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(brandAccessTokens)
    .where(eq(brandAccessTokens.token, token))
    .limit(1);

  const accessToken = result.length > 0 ? result[0] : null;
  if (!accessToken || !accessToken.isActive) {
    return null;
  }

  // Check if token is expired
  if (accessToken.expiresAt && new Date(accessToken.expiresAt) < new Date()) {
    return null;
  }

  return accessToken.brandId;
}

/**
 * Delete a brand
 */
export async function deleteBrand(brandId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Delete access tokens
  await db.delete(brandAccessTokens).where(eq(brandAccessTokens.brandId, brandId));

  // Delete products
  await db.delete(products).where(eq(products.brandId, brandId));

  // Delete brand user
  await db.delete(users).where(eq(users.id, brandId));

  return { success: true };
}

/**
 * Get all brand tokens (for admin)
 */
export async function getAllBrandTokens() {
  const db = await getDb();
  if (!db) return {};

  const tokens = await db.select().from(brandAccessTokens);
  const tokenMap: Record<number, string> = {};
  tokens.forEach((t) => {
    tokenMap[t.brandId] = t.token;
  });
  return tokenMap;
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export async function addToWishlist(userId: number | string, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const userIdStr = String(userId);
  
  // Check if already in wishlist
  const existing = await db
    .select()
    .from(wishlists)
    .where(and(
      eq(wishlists.userId, userIdStr),
      eq(wishlists.productId, productId)
    ));
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  const result = await db.insert(wishlists).values({
    userId: userIdStr,
    productId,
  });
  
  return {
    id: (result as any).insertId || 1,
    userId,
    productId,
  };
}

export async function removeFromWishlist(userId: number | string, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const userIdStr = String(userId);
  
  await db
    .delete(wishlists)
    .where(and(
      eq(wishlists.userId, userIdStr),
      eq(wishlists.productId, productId)
    ));
  
  return { success: true };
}

export async function getWishlist(userId: number | string) {
  const db = await getDb();
  if (!db) return [];
  
  const userIdStr = String(userId);
  
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      category: products.category,
      price: products.price,
      stock: products.stock,
      featured: products.featured,
      primaryImage: productImages.imageUrl,
    })
    .from(wishlists)
    .innerJoin(products, eq(wishlists.productId, products.id))
    .leftJoin(productImages, and(
      eq(productImages.productId, products.id),
      eq(productImages.isPrimary, true)
    ))
    .where(eq(wishlists.userId, userIdStr))
    .orderBy(desc(wishlists.createdAt));
  
  return result;
}

export async function isInWishlist(userId: number | string, productId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const userIdStr = String(userId);
  
  const result = await db
    .select()
    .from(wishlists)
    .where(and(
      eq(wishlists.userId, userIdStr),
      eq(wishlists.productId, productId)
    ));
  
  return result.length > 0;
}


// ─── Product Videos ─────────────────────────────────────────────────────────────────
export async function addProductVideo(productId: number, videoUrl: string, title?: string, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(productVideos).values({
    productId,
    videoUrl,
    title: title || undefined,
    description: description || undefined,
  });
  
  return {
    id: (result as any).insertId || 1,
    productId,
    videoUrl,
    title,
    description,
  };
}

export async function getProductVideos(productId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const videos = await db
    .select()
    .from(productVideos)
    .where(and(
      eq(productVideos.productId, productId),
      eq(productVideos.isActive, true)
    ));
  
  return videos;
}

export async function deleteProductVideo(videoId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(productVideos)
    .set({ isActive: false })
    .where(eq(productVideos.id, videoId));
}

export async function updateProductVideo(videoId: number, updates: { title?: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(productVideos)
    .set(updates)
    .where(eq(productVideos.id, videoId));
}
