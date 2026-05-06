import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Retrieve the user ID and credit amount from metadata
    const userId = session.metadata?.userId;
    const creditAmount = parseInt(session.metadata?.creditAmount || "0");

    if (!userId || !creditAmount) {
      return NextResponse.json(
        { error: "Missing metadata in session" },
        { status: 400 }
      );
    }

    try {
      // Use a transaction to update credits and record the transaction
      await db.$transaction([
        db.user.update({
          where: { id: userId },
          data: {
            credits: {
              increment: creditAmount,
            },
          },
        }),
        db.creditTransaction.create({
          data: {
            userId,
            amount: creditAmount,
            type: "CREDIT_PURCHASE",
          },
        }),
      ]);

      console.log(`Successfully added ${creditAmount} credits to user ${userId}`);
    } catch (error) {
      console.error("Error updating user credits:", error);
      return NextResponse.json(
        { error: "Error updating credits" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
