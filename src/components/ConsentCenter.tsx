"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import {
  NOTIFICATION_CONSENT_KEY,
  createPrivacyPreferences,
  defaultPrivacyPreferences,
  readStoredPrivacyPreferences,
  storePrivacyPreferences,
} from "@/lib/privacy";

type BrowserNotificationPermission = NotificationPermission | "unsupported";

type DraftPreferences = {
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  notifications: boolean;
};

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

function readDraftPreferences(): DraftPreferences {
  const stored = readStoredPrivacyPreferences();
  return {
    preferences: stored?.preferences ?? defaultPrivacyPreferences.preferences,
    statistics: stored?.statistics ?? defaultPrivacyPreferences.statistics,
    marketing: stored?.marketing ?? defaultPrivacyPreferences.marketing,
    notifications: stored?.notifications ?? defaultPrivacyPreferences.notifications,
  };
}

export function ConsentCenter() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<DraftPreferences>(readDraftPreferences);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedPreferences = readStoredPrivacyPreferences();
      const permission: BrowserNotificationPermission =
        "Notification" in window ? Notification.permission : "unsupported";

      setShowCookieNotice(!storedPreferences);
      setDraftPreferences(readDraftPreferences());
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
    setShowSettings(false);
    setShowCookieNotice(false);
  };

  const declineOptional = () => {
    saveEssentialOnlyConsent();
    localStorage.setItem(NOTIFICATION_CONSENT_KEY, "dismissed");
    setShowSettings(false);
    setShowCookieNotice(false);
  };

  const saveCustomPreferences = async () => {
    const notifications = draftPreferences.notifications ? await requestNotifications() : false;

    storePrivacyPreferences(
      createPrivacyPreferences({
        preferences: draftPreferences.preferences,
        statistics: draftPreferences.statistics,
        marketing: draftPreferences.marketing,
        notifications,
      })
    );

    if (!draftPreferences.notifications) {
      localStorage.setItem(NOTIFICATION_CONSENT_KEY, "dismissed");
    }

    setShowSettings(false);
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
            Usamos cookies essenciais para o site funcionar. Você pode aceitar todos os opcionais,
            recusar ou configurar preferências de estatísticas, marketing, idioma, favoritos e notificações.
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-primary" onClick={() => void acceptAll()}>
              Aceitar
            </button>
            <button type="button" className="btn btn-secondary" onClick={declineOptional}>
              Recusar opcionais
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowSettings((value) => !value)}>
              {showSettings ? "Fechar opções" : "Configurar"}
            </button>
            <Link href="/politica-de-cookies" className="consent-link">
              Ver política
            </Link>
          </div>

          {showSettings && (
            <div
              style={{
                marginTop: 18,
                paddingTop: 18,
                borderTop: "1px solid var(--border)",
                display: "grid",
                gap: 12,
              }}
            >
              <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <input type="checkbox" checked disabled style={{ marginTop: 4 }} />
                <span>
                  <strong>Essenciais</strong>
                  <br />
                  Necessários para consentimento, sessão administrativa e funcionamento básico.
                </span>
              </label>

              <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={draftPreferences.preferences}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({ ...current, preferences: event.target.checked }))
                  }
                  style={{ marginTop: 4 }}
                />
                <span>
                  <strong>Preferências</strong>
                  <br />
                  Salva idioma, tema, favoritos, histórico recente e preferências locais do site.
                </span>
              </label>

              <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={draftPreferences.statistics}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({ ...current, statistics: event.target.checked }))
                  }
                  style={{ marginTop: 4 }}
                />
                <span>
                  <strong>Estatísticas</strong>
                  <br />
                  Permite medir páginas acessadas e desempenho agregado com ferramentas como Google Analytics.
                </span>
              </label>

              <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={draftPreferences.marketing}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({ ...current, marketing: event.target.checked }))
                  }
                  style={{ marginTop: 4 }}
                />
                <span>
                  <strong>Marketing</strong>
                  <br />
                  Habilita integrações de campanhas, publicidade e públicos quando o projeto usar esses recursos.
                </span>
              </label>

              <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={draftPreferences.notifications}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({ ...current, notifications: event.target.checked }))
                  }
                  style={{ marginTop: 4 }}
                />
                <span>
                  <strong>Notificações</strong>
                  <br />
                  Se permitido no navegador, pode avisar sobre novidades importantes no site.
                </span>
              </label>

              <div className="consent-actions" style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-primary" onClick={() => void saveCustomPreferences()}>
                  Salvar preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
