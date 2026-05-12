"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  CONSENT_UPDATED_EVENT,
  LANGUAGE_KEY,
  PREFERENCES_UPDATED_EVENT,
  PrivacyPreferences,
  SiteTheme,
  THEME_KEY,
  readStoredPrivacyPreferences,
} from "@/lib/privacy";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function getEffectiveTheme(theme: SiteTheme) {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme() {
  const theme = (localStorage.getItem(THEME_KEY) as SiteTheme | null) || "system";
  document.documentElement.dataset.theme = getEffectiveTheme(theme);
  document.documentElement.dataset.themePreference = theme;
}

function injectScript(id: string, src: string, inline?: string) {
  if (document.getElementById(id)) return;

  if (inline) {
    const script = document.createElement("script");
    script.id = id;
    script.textContent = inline;
    document.head.appendChild(script);
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function enableGoogleAnalytics() {
  if (!googleAnalyticsId) return;

  injectScript("ga-loader", `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`);
  injectScript(
    "ga-init",
    "",
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}',{ anonymize_ip:true });`
  );
}

function enableMetaPixel() {
  if (!metaPixelId) return;

  injectScript(
    "meta-pixel-init",
    "",
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`
  );
}

function applyConsent(preferences: PrivacyPreferences | null) {
  if (!preferences) return;
  if (preferences.statistics) enableGoogleAnalytics();
  if (preferences.marketing) enableMetaPixel();
}

export function UserPreferenceRuntime() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    applyTheme();
    applyConsent(readStoredPrivacyPreferences());

    const onUpdate = (event: Event) => {
      applyConsent((event as CustomEvent<PrivacyPreferences>).detail || readStoredPrivacyPreferences());
    };
    const onPreferenceUpdate = () => applyTheme();
    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");

    window.addEventListener(CONSENT_UPDATED_EVENT, onUpdate);
    window.addEventListener(PREFERENCES_UPDATED_EVENT, onPreferenceUpdate);
    themeMedia.addEventListener("change", onPreferenceUpdate);

    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, onUpdate);
      window.removeEventListener(PREFERENCES_UPDATED_EVENT, onPreferenceUpdate);
      themeMedia.removeEventListener("change", onPreferenceUpdate);
    };
  }, []);

  useEffect(() => {
    const preferences = readStoredPrivacyPreferences();
    if (!preferences?.preferences) return;
    if (searchParams.get("lang")) return;
    if (pathname !== "/" && !pathname.startsWith("/blog/")) return;

    const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (storedLanguage !== "pt" && storedLanguage !== "en") return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("lang", storedLanguage);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
