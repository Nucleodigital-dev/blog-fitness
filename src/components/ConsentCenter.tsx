"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import {
  NOTIFICATION_CONSENT_KEY,
  createPrivacyPreferences,
  readStoredPrivacyPreferences,
  storePrivacyPreferences,
} from "@/lib/privacy";

type BrowserNotificationPermission = NotificationPermission | "unsupported";

function saveAllConsent(notifications: boolean) {
  storePrivacyPreferences(
    createPrivacyPreferences({
      preferences: true,
      statistics: true,
      marketing: true,
      notifications,
    })
  );
}

function saveEssentialOnlyConsent() {
  storePrivacyPreferences(
    createPrivacyPreferences({
      preferences: false,
      statistics: false,
      marketing: false,
      notifications: false,
    })
  );
}

export function ConsentCenter() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedPreferences = readStoredPrivacyPreferences();
      const permission: BrowserNotificationPermission =
        "Notification" in window ? Notification.permission : "unsupported";

      setShowCookieNotice(!storedPreferences);
      setIsLoaded(true);

      if (permission === "granted") {
        localStorage.setItem(NOTIFICATION_CONSENT_KEY, "granted");
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const requestNotifications = async () => {
    if (!("Notification" in window)) {
      localStorage.setItem(NOTIFICATION_CONSENT_KEY, "unsupported");
      return false;
    }

    const permission = await Notification.requestPermission();
    localStorage.setItem(NOTIFICATION_CONSENT_KEY, permission);

    if (permission === "granted") {
      new Notification("Notificações ativadas", {
        body: "Você receberá avisos quando houver novidades importantes no Saúde em Foco.",
        icon: "/logo.png",
      });
      return true;
    }

    return false;
  };

  const acceptAll = async () => {
    const notifications = await requestNotifications();
    saveAllConsent(notifications);
    setShowCookieNotice(false);
  };

  const declineOptional = () => {
    saveEssentialOnlyConsent();
    localStorage.setItem(NOTIFICATION_CONSENT_KEY, "dismissed");
    setShowCookieNotice(false);
  };

  if (!isLoaded || !showCookieNotice) return null;

  return (
    <div className="consent-stack" aria-live="polite">
      <section className="consent-card cookie-consent" aria-label="Aviso de cookies">
        <div className="consent-icon" aria-hidden="true">
          <Cookie size={20} />
        </div>
        <div>
          <h2>Política de cookies</h2>
          <p>
            Usamos cookies essenciais para o site funcionar. Ao aceitar, salvamos todas as
            preferências opcionais, incluindo idioma, tema, favoritos, estatísticas, marketing e
            notificações quando permitidas no navegador.
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-primary" onClick={() => void acceptAll()}>
              Aceitar
            </button>
            <button type="button" className="btn btn-secondary" onClick={declineOptional}>
              Recusar opcionais
            </button>
            <Link href="/politica-de-cookies" className="consent-link">
              Ver política
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
