"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Pages that require onboarding to be complete
const PROTECTED_PATHS = ["/explore", "/dashboard", "/appointments", "/interviewers"];
const INTERVIEWER_ONLY = ["/dashboard"];
const INTERVIEWEE_ONLY = ["/appointments"];

export default function RoleRedirect({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Redirect UNASSIGNED users away from protected pages (but NOT the landing page or /onboarding itself)
    const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
    if (role === "UNASSIGNED" && isProtected && pathname !== "/onboarding") {
      router.replace("/onboarding");
      return;
    }

    // Already onboarded users shouldn't be on /onboarding
    if (role === "INTERVIEWER" && pathname.startsWith("/onboarding"))
      router.replace("/dashboard");
    if (role === "INTERVIEWEE" && pathname.startsWith("/onboarding"))
      router.replace("/explore");

    // Role-restricted pages
    if (
      role === "INTERVIEWEE" &&
      INTERVIEWER_ONLY.some((p) => pathname.startsWith(p))
    )
      router.replace("/explore");
    if (
      role === "INTERVIEWER" &&
      INTERVIEWEE_ONLY.some((p) => pathname.startsWith(p))
    )
      router.replace("/dashboard");
  }, [role, pathname, router]);

  return null;
}

