import { Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { orders } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// Stripe API version will be determined by the SDK

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig || !webhookSecret) {
    console.error("[Webhook] Missing signature or webhook secret");
    return res.status(400).json({ error: "Missing signature" });
  }

  let event: Stripe.Event;

  try {
    const body = (req as any).rawBody || req.body;
    event = stripe.webhooks.constructEvent(body, sig as string, webhookSecret);
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  console.log(`[Webhook] Processing event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      }

      case "payment_intent.succeeded": {
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      }

      case "charge.refunded": {
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`[Webhook] Processing checkout.session.completed: ${session.id}`);

  const db = await getDb();
  if (!db) {
    console.error("[Webhook] Database not available");
    return;
  }

  // Extract order ID from metadata
  const orderId = session.metadata?.order_id;
  const userId = session.metadata?.user_id;

  if (!orderId) {
    console.warn("[Webhook] No order_id in session metadata");
    return;
  }

  try {
    // Update order status to "processing"
    await db
      .update(orders)
      .set({
        status: "processing",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, parseInt(orderId)));

    console.log(`[Webhook] Order ${orderId} updated to processing status`);

    // Optional: Send notification to owner
    // await notifyOwner({
    //   title: "New Order Received",
    //   content: `Order #${orderId} has been paid and is now processing.`,
    // });
  } catch (error) {
    console.error("[Webhook] Failed to update order:", error);
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[Webhook] Processing payment_intent.succeeded: ${paymentIntent.id}`);

  // This is a backup handler in case checkout.session.completed doesn't fire
  // Usually checkout.session.completed is sufficient
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log(`[Webhook] Processing charge.refunded: ${charge.id}`);

  const db = await getDb();
  if (!db) {
    console.error("[Webhook] Database not available");
    return;
  }

  // Find order by Stripe payment intent ID
  if (charge.payment_intent && typeof charge.payment_intent === "string") {
    try {
      // Update order status to "refunded"
      // Note: You may want to store stripe_payment_intent_id in orders table for this
      console.log(`[Webhook] Charge refunded for payment intent: ${charge.payment_intent}`);
    } catch (error) {
      console.error("[Webhook] Failed to process refund:", error);
    }
  }
}
