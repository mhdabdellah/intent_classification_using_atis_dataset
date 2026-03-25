"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  tr: "TR",
  ar: "AR"
};

type LocaleSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/");

  return (
    <nav
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/70 p-1 text-xs font-semibold tracking-[0.2em] text-[var(--muted)]"
    >
      {locales.map((locale) => {
        const nextSegments = [...segments];
        nextSegments[1] = locale;
        const href = nextSegments.join("/") || `/${locale}`;
        const isActive = currentLocale === locale;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1 transition",
              isActive
                ? "bg-[var(--accent)] text-white"
                : "hover:text-[var(--fg)]"
            )}
          >
            {localeShortLabels[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
