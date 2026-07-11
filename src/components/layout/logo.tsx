import { Sprout } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      aria-label="Kéfir Vivo, ir al inicio"
      className="inline-flex items-center gap-2.5 rounded-full text-leaf-dark"
      href="/"
    >
      <span className="grid size-10 place-items-center rounded-full bg-leaf-dark text-milk shadow-sm">
        <Sprout aria-hidden="true" size={21} strokeWidth={1.8} />
      </span>
      {!compact ? (
        <span className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]">
          {siteConfig.name}
        </span>
      ) : null}
    </Link>
  );
}
