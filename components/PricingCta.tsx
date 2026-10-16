"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { PLANS, priceLabel, type PlanKey } from "@/lib/plans";
import { track } from "@/lib/analytics";

/* CTA button on /pricing: opens the global Pro modal (sign-in → checkout)
   so the plan is always tied to a Google account for entitlement checks. */
export default function PricingCta({ planKey }: { planKey: PlanKey }) {
  const { openModal, isPro, isLoggedIn } = useAuth();
  const plan = PLANS[planKey];

  useEffect(() => { track("pricing_viewed", { plan: planKey }); }, [planKey]);

  if (isPro) {
    return (
      <Link href="/dashboard" className="inline-flex w-full items-center justify-center rounded-md border-2 border-ink px-6 py-3 font-semibold text-ink">
        You&apos;re on {plan.name} — open dashboard
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => openModal(isLoggedIn ? "upgrade" : "choose", `pricing_${planKey}`)}
      className="inline-flex w-full items-center justify-center rounded-md bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-ink-700"
    >
      Get {plan.name} — {priceLabel(plan)}
    </button>
  );
}
