import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Minimal public context (no auth needed for public procedures)
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("applications.submit", () => {
  it("validates required fields — rejects empty brandName", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.applications.submit({
        brandName: "",
        contactName: "Test Contact",
        email: "test@example.com",
      })
    ).rejects.toThrow();
  });

  it("validates email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.applications.submit({
        brandName: "Test Brand",
        contactName: "Test Contact",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });
});

describe("contact.send", () => {
  it("validates required fields — rejects short message", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.send({
        name: "Test User",
        email: "test@example.com",
        message: "short",
      })
    ).rejects.toThrow();
  });

  it("validates email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.send({
        name: "Test User",
        email: "invalid-email",
        message: "This is a valid message that is long enough to pass validation.",
      })
    ).rejects.toThrow();
  });
});

describe("newsletter.subscribe", () => {
  it("validates email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.newsletter.subscribe({
        email: "not-valid",
      })
    ).rejects.toThrow();
  });
});

describe("events.list", () => {
  it("returns an array (empty or populated)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.events.list();
    expect(Array.isArray(result)).toBe(true);
  });
});
