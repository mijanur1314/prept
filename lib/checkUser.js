import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const PLAN_CREDITS = {
  pro: 15,
  starter: 5,
  free: 1,
};

const getCurrentPlan = async () => {
  const { has } = await auth();
  if (has({ plan: "pro" })) return "pro";
  if (has({ plan: "starter" })) return "starter";
  return "free";
};

const shouldAllocateCredits = (dbUser, currentPlan) => {
  if (dbUser.currentPlan !== currentPlan) return true;
  if (!dbUser.creditsLastAllocatedAt) return true;

  const now = new Date();
  const last = new Date(dbUser.creditsLastAllocatedAt);

  return (
    now.getFullYear() > last.getFullYear() || now.getMonth() > last.getMonth()
  );
};

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const currentPlan = await getCurrentPlan();
    const credits = PLAN_CREDITS[currentPlan];
    const primaryEmail = user.emailAddresses[0]?.emailAddress;
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

    if (!primaryEmail) {
      throw new Error("No email found for current user");
    }

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      if (loggedInUser.role === "INTERVIEWER") return loggedInUser;

      if (shouldAllocateCredits(loggedInUser, currentPlan)) {
        const rolledCredits = credits + (loggedInUser.credits ?? 0);

        return await db.user.update({
          where: { clerkUserId: user.id },
          data: {
            credits: rolledCredits,
            currentPlan,
            creditsLastAllocatedAt: new Date(),
            email: primaryEmail,
            name,
            imageUrl: user.imageUrl,
          },
        });
      }

      return loggedInUser;
    }

    const existingByEmail = await db.user.findUnique({
      where: { email: primaryEmail },
    });

    if (existingByEmail) {
      return await db.user.update({
        where: { email: primaryEmail },
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl,
          ...(existingByEmail.role !== "INTERVIEWER" &&
          shouldAllocateCredits(existingByEmail, currentPlan)
            ? {
                credits: credits + (existingByEmail.credits ?? 0),
                currentPlan,
                creditsLastAllocatedAt: new Date(),
              }
            : {}),
        },
      });
    }

    return await db.user.create({
      data: {
        clerkUserId: user.id,
        email: primaryEmail,
        name,
        imageUrl: user.imageUrl,
        credits,
        currentPlan,
        creditsLastAllocatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};
