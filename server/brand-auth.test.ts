import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createBrandAccount, authenticateBrand, getBrandByEmail } from "./brand-auth";

describe("Brand Authentication", () => {
  it("should create a new brand account", async () => {
    const testBrand = {
      name: "Test Brand",
      email: `test-brand-${Date.now()}-1@example.com`,
      password: "TestPassword123",
    };
    const result = await createBrandAccount(testBrand);
    expect(result.success).toBe(true);
    expect(result.brandId).toBeGreaterThan(0);
  });

  it("should authenticate brand with correct credentials", async () => {
    const testBrand = {
      name: "Test Brand Auth",
      email: `test-brand-${Date.now()}-2@example.com`,
      password: "TestPassword123",
    };
    // Create brand first
    await createBrandAccount(testBrand);

    // Authenticate
    const result = await authenticateBrand(testBrand.email, testBrand.password);
    expect(result.token).toBeDefined();
    expect(result.brandId).toBeGreaterThan(0);
    expect(result.brandName).toBe(testBrand.name);
    expect(result.email).toBe(testBrand.email);
  });

  it("should fail authentication with wrong password", async () => {
    const testBrand = {
      name: "Test Brand Wrong Pass",
      email: `test-brand-${Date.now()}-3@example.com`,
      password: "TestPassword123",
    };
    // Create brand first
    await createBrandAccount(testBrand);

    // Try to authenticate with wrong password
    try {
      await authenticateBrand(testBrand.email, "WrongPassword123");
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Email veya şifre yanlış");
    }
  });

  it("should fail authentication with non-existent email", async () => {
    try {
      await authenticateBrand(`nonexistent-${Date.now()}@example.com`, "Password123");
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Email veya şifre yanlış");
    }
  });

  it("should not allow duplicate email registration", async () => {
    const email = `test-brand-${Date.now()}-4@example.com`;
    const testBrand = {
      name: "Test Brand Duplicate",
      email,
      password: "TestPassword123",
    };
    // Create brand first
    await createBrandAccount(testBrand);

    // Try to create another brand with same email
    try {
      await createBrandAccount({
        name: "Another Brand",
        email,
        password: "AnotherPassword123",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Bu email zaten kullanılıyor");
    }
  });

  it("should get brand by email", async () => {
    const testBrand = {
      name: "Test Brand Get",
      email: `test-brand-${Date.now()}-5@example.com`,
      password: "TestPassword123",
    };
    // Create brand first
    await createBrandAccount(testBrand);

    // Get brand
    const brand = await getBrandByEmail(testBrand.email);
    expect(brand).toBeDefined();
    expect(brand?.name).toBe(testBrand.name);
    expect(brand?.email).toBe(testBrand.email);
  });
});
