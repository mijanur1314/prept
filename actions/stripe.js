"use server";

import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";

export async function createCheckoutSession(creditAmount, priceInCents) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${creditAmount} Prept Credits`,
              description: `Purchase ${creditAmount} credits for mock interviews.`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout_canceled=true`,
      metadata: {
        userId: user.id,
        creditAmount: creditAmount.toString(),
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
