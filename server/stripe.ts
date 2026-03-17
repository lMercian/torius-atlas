import Stripe from "stripe";
import { ENV } from "./_core/env";

export const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

export interface CheckoutSessionParams {
  userId?: number;
  orderId?: number;
  userEmail: string;
  userName: string;
  items: Array<{
    productId: number;
    productName: string;
    price: number; // in cents
    quantity: number;
  }>;
  origin: string;
}

export async function createCheckoutSession(params: CheckoutSessionParams) {
  const lineItems = params.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productName,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: params.userEmail,
    client_reference_id: params.userId?.toString(),
    metadata: {
      user_id: params.userId?.toString() || "guest",
      order_id: params.orderId?.toString() || "",
      customer_email: params.userEmail,
      customer_name: params.userName,
    },
    allow_promotion_codes: true,
    success_url: `${params.origin}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/shop?cancelled=true`,
  });

  return session;
}

export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });
}

export async function getPaymentIntent(paymentIntentId: string) {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}
