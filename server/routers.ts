import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAllEvents,
  getEventById,
  createBrandApplication,
  createContactMessage,
  subscribeNewsletter,
  getAllApplications,
  getAllContactMessages,
  createEvent,
  updateEvent,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByBrand,
  addProductImage,
  getProductImages,
  getOrdersWithItems,
  updateUserProfile,
  getAllBrands,
  getAllBrandTokens,
  createBrandWithToken,
  deleteBrand,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  isInWishlist,
  addProductVideo,
  getProductVideos,
  deleteProductVideo,
  updateProductVideo,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { sendApplicationConfirmationEmail, sendApplicationNotificationEmail } from "./_core/email";
import { createCheckoutSession } from "./stripe";
import { authenticateBrand, createBrandAccount } from "./brand-auth";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ─── Events ───────────────────────────────────────────────────────────────────

  events: router({
    list: publicProcedure.query(async () => {
      return getAllEvents();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const event = await getEventById(input.id);
        if (!event) throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
        return event;
      }),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          city: z.string().min(1),
          state: z.string().min(1),
          address: z.string().min(1),
          venue: z.string().optional(),
          startDate: z.date(),
          endDate: z.date(),
          status: z.enum(["open", "coming_soon", "sold_out", "past"]).default("coming_soon"),
          boothFee: z.string().optional(),
          vendorSpots: z.number().optional(),
          expectedAttendance: z.number().optional(),
          description: z.string().optional(),
          highlights: z.string().optional(),
          categoriesWanted: z.string().optional(),
          imageUrl: z.string().optional(),
          featured: z.boolean().default(false),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
        }
        await createEvent(input);
        return { success: true };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            status: z.enum(["open", "coming_soon", "sold_out", "past"]).optional(),
            boothFee: z.string().optional(),
            vendorSpots: z.number().optional(),
            expectedAttendance: z.number().optional(),
            description: z.string().optional(),
            featured: z.boolean().optional(),
          }),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
        }
        await updateEvent(input.id, input.data);
        return { success: true };
      }),
  }),

  // ─── Brand Applications ───────────────────────────────────────────────────────

  applications: router({
    submit: publicProcedure
      .input(
        z.object({
          eventId: z.number().optional(),
          brandName: z.string().min(1, "Brand name is required"),
          contactName: z.string().min(1, "Contact name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().optional(),
          website: z.string().optional(),
          instagram: z.string().optional(),
          category: z.string().optional(),
          description: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createBrandApplication(input);
        
        // Send confirmation email to applicant
        await sendApplicationConfirmationEmail(
          input.email,
          input.brandName,
          input.contactName
        );
        
        // Send notification email to admin
        await sendApplicationNotificationEmail(
          input.brandName,
          input.contactName,
          input.email,
          input.category,
          input.message
        );
        
        await notifyOwner({
          title: `New Brand Application: ${input.brandName}`,
          content: `${input.contactName} (${input.email}) has submitted an application for ${input.brandName}. Category: ${input.category || "N/A"}`,
        });
        return { success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getAllApplications();
    }),
  }),

  // ─── Contact Messages ─────────────────────────────────────────────────────────

  contact: router({
    send: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          subject: z.string().optional(),
          message: z.string().min(10, "Message must be at least 10 characters"),
          type: z.enum(["general", "brand_inquiry", "press", "partnership"]).default("general"),
        })
      )
      .mutation(async ({ input }) => {
        await createContactMessage(input);
        await notifyOwner({
          title: `New Contact Message from ${input.name}`,
          content: `${input.email} sent a ${input.type} message: ${input.message.substring(0, 200)}${input.message.length > 200 ? "..." : ""}`,
        });
        return { success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getAllContactMessages();
    }),
  }),

  // ─── Newsletter ───────────────────────────────────────────────────────────────

  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Valid email is required"),
          name: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await subscribeNewsletter(input);
        return { success: true };
      }),
  }),

  // ─── Shop ─────────────────────────────────────────────────────────────────────

  shop: router({
    getProducts: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          search: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        return getProducts(input);
      }),

    createProduct: publicProcedure
      .input(
        z.object({
          brandId: z.number(),
          name: z.string().min(1),
          description: z.string().optional(),
          category: z.string().min(1),
          price: z.number().min(0),
          stock: z.number().min(0),
          featured: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createProduct({
          name: input.name,
          description: input.description,
          category: input.category,
          price: input.price.toString(),
          stock: input.stock,
          featured: input.featured,
          brandId: input.brandId,
        });
        return { success: true, id: result.id };
      }),

    updateProduct: publicProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            category: z.string().optional(),
            price: z.number().optional(),
            stock: z.number().optional(),
            featured: z.boolean().optional(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        const updateData = {
          ...input.data,
          price: input.data.price ? input.data.price.toString() : undefined,
        };
        await updateProduct(input.id, updateData);
        return { success: true };
      }),

    deleteProduct: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteProduct(input.id);
        return { success: true };
      }),

    getProductsByBrand: publicProcedure
      .input(z.object({ brandId: z.number() }))
      .query(async ({ input }) => {
        const products = await getProductsByBrand(input.brandId);
        return products || [];
      }),

    addProductImage: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          imageUrl: z.string().url(),
          isPrimary: z.boolean().default(false),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await addProductImage(input);
        return { success: true };
      }),

    getProductImages: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        return getProductImages(input.productId);
      }),

    addToWishlist: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        const result = await addToWishlist(ctx.user.id, input.productId);
        return { success: true, id: result.id };
      }),

    removeFromWishlist: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        await removeFromWishlist(ctx.user.id, input.productId);
        return { success: true };
      }),

    getWishlist: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return getWishlist(ctx.user.id);
    }),

    isInWishlist: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user?.id) {
          return false;
        }
        return isInWishlist(ctx.user.id, input.productId);
      }),

    getProductVideos: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        return getProductVideos(input.productId);
      }),
  }),

  // Account router for user orders and profile
  account: router({
    getOrders: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return getOrdersWithItems(ctx.user.id);
    }),

    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          address: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        await updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  admin: router({
    getBrands: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return getAllBrands();
    }),

    getBrandTokens: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return getAllBrandTokens();
    }),

    createBrand: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { brandId, token } = await createBrandWithToken(input);
        return { brandId, token, success: true };
      }),

    deleteBrand: protectedProcedure
      .input(z.object({ brandId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return deleteBrand(input.brandId);
      }),
  }),

  brand: router({
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async ({ input }) => {
        return authenticateBrand(input.email, input.password);
      }),

    register: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async ({ input }) => {
        return createBrandAccount(input);
      }),
  }),

  payment: router({
    createCheckoutSession: protectedProcedure
      .input(
        z.object({
          items: z.array(
            z.object({
              productId: z.number(),
              productName: z.string(),
              price: z.number(),
              quantity: z.number().min(1),
            })
          ),
          orderId: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id || !ctx.user?.email) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const origin = ctx.req.headers.origin || "https://toriusatlas.com";

        const session = await createCheckoutSession({
          userId: ctx.user.id,
          orderId: input.orderId,
          userEmail: ctx.user.email,
          userName: ctx.user.name || "Customer",
          items: input.items,
          origin,
        });

        return {
          sessionId: session.id,
          url: session.url,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
