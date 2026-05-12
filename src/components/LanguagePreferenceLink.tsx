"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { LANGUAGE_KEY, SiteLanguage, dispatchPreferenceUpdate } from "@/lib/privacy";

type LanguagePreferenceLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string;
  language: SiteLanguage;
  children: ReactNode;
};

export function LanguagePreferenceLink({
  href,
  language,
  children,
  ...props
}: LanguagePreferenceLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={() => {
        localStorage.setItem(LANGUAGE_KEY, language);
        dispatchPreferenceUpdate();
      }}
    >
      {children}
    </Link>
  );
}
