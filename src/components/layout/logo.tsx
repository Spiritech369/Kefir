import { Leaf } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link aria-label={`${siteConfig.name}, ir al inicio`} className="inline-flex items-center gap-3 text-brand-deep" href="/">
    <span className="grid size-10 place-items-center rounded-full border border-brand bg-surface text-brand-deep"><Leaf aria-hidden="true" size={20} strokeWidth={1.6} /></span>
    {!compact && <span className="font-display text-2xl font-semibold tracking-[0.18em]">{siteConfig.name}</span>}
  </Link>;
}
