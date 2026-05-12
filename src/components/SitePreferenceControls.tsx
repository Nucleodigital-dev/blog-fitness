"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  LANGUAGE_KEY,
  SiteLanguage,
  SiteTheme,
  THEME_KEY,
  dispatchPreferenceUpdate,
} from "@/lib/privacy";

function getStoredTheme(): SiteTheme {
  const value = localStorage.getItem(THEME_KEY);
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}

function getStoredLanguage(): SiteLanguage {
  return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "pt";
}

export function SitePreferenceControls() {
  const [theme, setTheme] = useState<SiteTheme>("system");
  const [language, setLanguage] = useState<SiteLanguage>("pt");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTheme(getStoredTheme());
      setLanguage(getStoredLanguage());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  const updateTheme = () => {
    localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
    dispatchPreferenceUpdate();
  };

  const updateLanguage = () => {
    const nextLanguage: SiteLanguage = language === "pt" ? "en" : "pt";
    localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    setLanguage(nextLanguage);
    dispatchPreferenceUpdate();
  };

  return (
    <div className="site-preference-controls" aria-label="Preferências do site">
      <button type="button" onClick={updateTheme} aria-label="Alternar tema">
        {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
      </button>
      <button type="button" onClick={updateLanguage} aria-label="Alternar idioma preferido">
        <Languages size={17} aria-hidden="true" />
        <span>{language.toUpperCase()}</span>
      </button>
    </div>
  );
}
