import { CodeDemo } from "@/components/demo-components-animate-code";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { AI_TAGS, AVATARS, LOGOS, ROLES, SLOTS } from "@/lib/data";
import {
  GoldTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusables";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Camera,
  Check,
  MessageSquare,
  Shield,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function MockUI({ rows = 3 }) {
  const widths = ["w-4/5", "w-3/5", "w-2/5", "w-4/5", "w-1/2"];
  const colors = [
    "bg-white/5",
    "bg-white/5",
    "bg-amber-400/15",
    "bg-white/5",
    "bg-white/5",
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#141417]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-white/5 px-3.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${widths[i]} ${colors[i]}`}
          />
        ))}
      </div>
    </div>
  );
}

export function BentoCard({ icon, title, desc, children, className = "" }) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f11] p-9 transition duration-300 hover:border-amber-400/20 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-400/5 via-transparent" />

      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-xl">
        {icon}
      </span>

      <h3 className="mb-2 font-serif text-xl tracking-tight">{title}</h3>
      <p className="leading-relaxed text-stone-400">{desc}</p>
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-black">
      <section className="relative grid min-h-screen grid-cols-1 overflow-hidden px-4 pt-28 pb-20 sm:px-8 sm:pt-32 lg:grid-cols-5">
        <StarsBackgroundDemo />

        <div className="col-span-full flex flex-col items-center justify-center text-center lg:col-span-3 lg:-rotate-2">
          <Badge variant="gold">Powered by AI - Now in Beta</Badge>

          <h1 className="relative max-w-4xl font-serif text-5xl tracking-tighter sm:text-6xl lg:text-7xl">
            <GrayTitle>Ace your next interview</GrayTitle>
            <br />
            <GoldTitle>with real experts</GoldTitle>
          </h1>

          <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base md:text-lg">
            Book 1:1 mock interviews with senior engineers from top companies.
            Get AI-powered feedback, role-specific questions, and the confidence
            to land your dream job.
          </p>

          <div className="relative mt-10 flex justify-center gap-2 sm:w-auto sm:gap-4">
            <Link href="/onboarding">
              <Button variant="gold" size="hero">
                Get started
              </Button>
            </Link>

            <Link href="/explore">
              <Button variant="outline" size="hero">
                Browse Interviewers -&gt;
              </Button>
            </Link>
          </div>

          <div className="relative mt-8 flex items-center justify-center gap-3 sm:mt-16 sm:gap-4">
            <div className="flex">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 overflow-hidden rounded-full border-2 border-[#0a0a0b] ${
                    i > 0 ? "-ml-2" : ""
                  }`}
                >
                  <Image
                    src={av.src}
                    alt="user avatar"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-stone-500 sm:text-left">
              <strong className="font-medium text-stone-400">
                2,400+ engineers
              </strong>{" "}
              cracked FAANG interviews via Prept
            </p>
          </div>
        </div>

        <div className="col-span-full mt-12 flex items-center justify-center lg:col-span-2 lg:mt-0 lg:justify-start lg:rotate-3">
          <CodeDemo duration={30000} writing />
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 py-14">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-stone-600">
          Interviewees landed roles at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-24 px-6">
          {LOGOS.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={50}
              height={50}
              className="h-6 w-auto grayscale opacity-60"
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-28">
        <div className="mb-16 text-center">
          <SectionLabel>Features</SectionLabel>
          <SectionHeading
            gray="Everything you need,"
            gold="nothing you don't"
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7">
            <BentoCard
              icon={<Bot size={20} className="text-amber-400" />}
              title={<GrayTitle>AI Question Generator</GrayTitle>}
              desc="Interviewers get a live AI co-pilot generating role-specific questions on demand - system design, behavioral, and DSA prompts tailored to each candidate."
            >
              <div className="mt-5 flex flex-wrap gap-2">
                {AI_TAGS.map((t) => (
                  <Badge key={t.label} variant={t.active ? "gold" : "outline"}>
                    {t.label}
                  </Badge>
                ))}
              </div>
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-5">
            <BentoCard
              icon={<Wallet size={16} className="text-amber-400" />}
              title={<GrayTitle>Credit System</GrayTitle>}
              desc="Subscribe for monthly credits, book sessions, and let interviewers withdraw earnings whenever they are ready."
            >
              <div className="mt-5 flex items-end justify-between rounded-xl border border-white/10 bg-[#141417] p-5">
                <div>
                  <p className="mb-1 text-xs text-stone-600">Your balance</p>
                  <p className="bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text font-serif text-4xl leading-none text-transparent">
                    28
                  </p>
                  <p className="mt-1 text-xs text-stone-600">
                    credits remaining
                  </p>
                </div>

                <Badge variant="secondary">+10 this month</Badge>
              </div>
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-4">
            <BentoCard
              icon={<Camera size={18} className="text-amber-400" />}
              title="HD Video Calls"
              desc="Powered by Stream with screen sharing, recording, and instant playback links built in."
            >
              <MockUI rows={3} />
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-4">
            <BentoCard
              icon={<MessageSquare size={18} className="text-amber-400" />}
              title="Persistent Chat"
              desc="Message your interviewer before and after the call. Share prep notes, resources, and follow-ups in one thread."
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <BentoCard
              icon={<Shield size={18} className="text-amber-400" />}
              title="Security by Arcjet"
              desc="Bot protection, rate limiting, and abuse prevention are baked into every API route."
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <BentoCard
              icon={<BarChart3 size={18} className="text-amber-400" />}
              title={<GrayTitle>AI Feedback Reports</GrayTitle>}
              desc="Post-interview analysis by Gemini with clear, actionable insights."
            >
              <MockUI rows={5} />
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-6">
            <BentoCard
              icon={<CalendarDays size={18} className="text-amber-400" />}
              title={<GoldTitle>Slot-based Scheduling</GoldTitle>}
              desc="Interviewers set availability once. Interviewees pick open slots and confirm with one click - no back-and-forth needed."
            >
              <div className="mt-5 flex flex-wrap gap-2">
                {SLOTS.map((s) => (
                  <span
                    key={s.label}
                    className={`rounded-lg border px-3 py-1.5 text-xs ${s.cls}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <div className="mb-16 text-center">
          <SectionLabel>Who it&apos;s for</SectionLabel>
          <SectionHeading gray="Built for both sides" gold="of the table" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ROLES.map((role) => (
            <div
              key={role.label}
              className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f11] p-12 transition duration-300 hover:border-amber-400/20"
            >
              <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.05)_0%,transparent_70%)]" />

              <span className="mb-5 inline-block rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
                {role.label}
              </span>

              <h3 className="mb-4 font-serif text-2xl tracking-tight">
                {role.title}
              </h3>

              <p className="mb-8 text-sm leading-relaxed text-stone-400">
                {role.desc}
              </p>

              <ul className="space-y-3">
                {role.perks.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-stone-400">
                    <span className="mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400">
                      <Check size={12} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <div className="mb-16 text-center">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading
            gray="Simple, transparent"
            gold="credit-based plans"
          />
          <p className="mt-3 text-sm text-stone-400">
            Each credit = one session. Unused credits roll over.
          </p>
        </div>

        <PricingSection />
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-linear-to-br from-amber-400/5 px-3 py-20 text-center sm:px-16">
          <StarsBackgroundDemo />

          <h2 className="relative mb-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            <GrayTitle>Your next interview</GrayTitle>
            <br />
            <GoldTitle>starts here</GoldTitle>
          </h2>

          <p className="relative mb-11 text-sm font-light text-stone-400">
            Join thousands of engineers already leveling up on Prept.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/onboarding" className="relative">
              <Button variant="gold" size="hero">
                Get started
              </Button>
            </Link>

            <Link href="/explore" className="relative">
              <Button variant="outline" size="hero">
                Browse Interviewers -&gt;
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
