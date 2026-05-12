export const PRIVACY_CONSENT_KEY = "saude_em_foco_privacy_preferences";
export const LEGACY_COOKIE_CONSENT_KEY = "saude_em_foco_cookie_consent";
export const NOTIFICATION_CONSENT_KEY = "saude_em_foco_notification_consent";
export const THEME_KEY = "saude_em_foco_theme";
export const LANGUAGE_KEY = "saude_em_foco_language";
export const SAVED_ARTICLES_KEY = "saude_em_foco_saved_articles";
export const RECENT_ARTICLES_KEY = "saude_em_foco_recent_articles";
export const FAVORITE_CATEGORIES_KEY = "saude_em_foco_favorite_categories";
export const LATEST_ARTICLE_SEEN_KEY = "saude_em_foco_latest_article_seen";
export const LATEST_ARTICLE_NOTIFIED_KEY = "saude_em_foco_latest_article_notified";
export const CONSENT_UPDATED_EVENT = "saude-em-foco-consent-updated";
export const PREFERENCES_UPDATED_EVENT = "saude-em-foco-preferences-updated";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type PrivacyPreferences = {
  essential: true;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  notifications: boolean;
  updatedAt: string;
};

export type SiteTheme = "light" | "dark" | "system";
export type SiteLanguage = "pt" | "en";

export const defaultPrivacyPreferences: PrivacyPreferences = {
  essential: true,
  preferences: false,
  statistics: false,
  marketing: false,
  notifications: false,
  updatedAt: "",
};

export function createPrivacyPreferences(
  values: Omit<PrivacyPreferences, "essential" | "updatedAt">
): PrivacyPreferences {
  return {
    essential: true,
    ...values,
    updatedAt: new Date().toISOString(),
  };
}

export function readStoredPrivacyPreferences(): PrivacyPreferences | null {
  try {
    const raw = localStorage.getItem(PRIVACY_CONSENT_KEY);
    if (raw) return { ...defaultPrivacyPreferences, ...JSON.parse(raw), essential: true };

    const legacy = localStorage.getItem(LEGACY_COOKIE_CONSENT_KEY);
    if (legacy === "accepted") {
      return createPrivacyPreferences({
        preferences: true,
        statistics: true,
        marketing: false,
        notifications: localStorage.getItem(NOTIFICATION_CONSENT_KEY) === "granted",
      });
    }
    if (legacy === "declined") {
      return createPrivacyPreferences({
        preferences: false,
        statistics: false,
        marketing: false,
        notifications: false,
      });
    }
  } catch {
    return null;
  }

  return null;
}

export function storePrivacyPreferences(preferences: PrivacyPreferences) {
  localStorage.setItem(PRIVACY_CONSENT_KEY, JSON.stringify(preferences));
  document.cookie = `${PRIVACY_CONSENT_KEY}=set; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: preferences }));
}

export function dispatchPreferenceUpdate() {
  window.dispatchEvent(new Event(PREFERENCES_UPDATED_EVENT));
}
