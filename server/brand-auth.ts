import { eq } from "drizzle-orm";
import { brands } from "../drizzle/schema";
import { getDb } from "./db";
import crypto from "crypto";

// Hash password with salt
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

// Verify password
function verifyPassword(password: string, hash: string): boolean {
  const [salt, storedHash] = hash.split(":");
  const computedHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return computedHash === storedHash;
}

// Generate secure token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createBrandAccount(data: {
  name: string;
  email: string;
  password: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if brand already exists
  const existing = await db
    .select()
    .from(brands)
    .where(eq(brands.email, data.email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Bu email zaten kullanılıyor");
  }

  // Hash password
  const passwordHash = hashPassword(data.password);

  // Create brand account
  await db.insert(brands).values({
    name: data.name,
    email: data.email,
    passwordHash,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Get the created brand
  const created = await db
    .select()
    .from(brands)
    .where(eq(brands.email, data.email))
    .limit(1);

  return {
    success: true,
    brandId: created[0]?.id || 0,
  };
}

export async function authenticateBrand(email: string, password: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(brands)
    .where(eq(brands.email, email))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Email veya şifre yanlış");
  }

  const brand = result[0];

  // Check if brand is active
  if (!brand.isActive) {
    throw new Error("Bu marka hesabı devre dışı bırakılmıştır");
  }

  // Verify password
  if (!verifyPassword(password, brand.passwordHash)) {
    throw new Error("Email veya şifre yanlış");
  }

  // Update last signed in
  await db
    .update(brands)
    .set({ lastSignedIn: new Date() })
    .where(eq(brands.id, brand.id));

  // Generate session token
  const token = generateToken();

  return {
    token,
    brandId: brand.id,
    brandName: brand.name,
    email: brand.email,
  };
}

export async function getBrandByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(brands)
    .where(eq(brands.email, email))
    .limit(1);

  return result[0] || null;
}

export async function getBrandById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(brands)
    .where(eq(brands.id, id))
    .limit(1);

  return result[0] || null;
}
