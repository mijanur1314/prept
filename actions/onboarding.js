"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/data";

export const completeOnboarding = async (data) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { role, title, company, yearsExp, bio, categories } = data;
  const allowedCategories = new Set(
    CATEGORIES.map((category) => category.value).filter(Boolean)
  );

  if (!role || !["INTERVIEWEE", "INTERVIEWER"].includes(role)) {
    throw new Error("Invalid role");
  }

  if (role === "INTERVIEWER") {
    if (!title || !company || !yearsExp || !bio || !categories?.length) {
      throw new Error("Please fill in all required fields");
    }

    const hasInvalidCategory = categories.some(
      (category) => !allowedCategories.has(category)
    );

    if (hasInvalidCategory) {
      throw new Error("Invalid interview category");
    }
  }

  try {
    await db.user.upsert({
      where: { clerkUserId: user.id },
      update: {
        role,
        ...(role === "INTERVIEWER"
          ? {
              title,
              company,
              yearsExp,
              bio,
              categories,
            }
          : {
              title: null,
              company: null,
              yearsExp: null,
              bio: null,
              categories: [],
            }),
      },
      create: {
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? `${user.id}@clerk.local`,
        name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
        imageUrl: user.imageUrl,
        role,
        ...(role === "INTERVIEWER"
          ? {
              title,
              company,
              yearsExp,
              bio,
              categories,
            }
          : {}),
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/onboarding");
    revalidatePath("/explore");
    revalidatePath("/dashboard");
    revalidatePath("/appointments");

    return {
      success: true,
      redirectTo: role === "INTERVIEWER" ? "/dashboard" : "/explore",
    };
  } catch (error) {
    console.error("Onboarding error:", error);
    throw new Error("Something went wrong. Please try again.");
  }
};
