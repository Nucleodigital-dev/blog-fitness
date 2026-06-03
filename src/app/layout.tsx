import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { ConsentCenter } from "@/components/ConsentCenter";
import { UserPreferenceRuntime } from "@/components/UserPreferenceRuntime";
import { getCategories, getSiteSettings } from "@/lib/content";
import type { Category } from "@/lib/content-types";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.title || siteName;
  const description = settings.description || siteDescription;
  const logo = settings.logo || "/logo.png";

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: title,
      images: [
        {
          url: absoluteUrl(logo),
          alt: settings.logoAlt || title,
          width: 1200,
          height: 630,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(logo)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    title: `${title} | Blog focado em SEO`,
    description,
    keywords: ["saúde", "fitness", "nutrição", "treino", "bem-estar", "emagrecimento", "musculação", "alimentação saudável"],
    authors: [{ name: title, url: siteUrl }],
    creator: title,
    publisher: title,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, settings]: [Category[], Awaited<ReturnType<typeof getSiteSettings>>] = await Promise.all([
    getCategories(),
    getSiteSettings(),
  ]);
  const logo = settings.logo || "/logo.png";
  const logoAlt = settings.logoAlt || settings.title || siteName;

  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para acelerar carregamento de recursos externos */}
        <link rel="preconnect" href="https://uwdgofppflpvwshxmrsr.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://uwdgofppflpvwshxmrsr.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: settings.title || siteName,
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl(settings.logo || "/logo.png"),
              },
              description: settings.description || siteDescription,
              inLanguage: "pt-BR",
              sameAs: [
                "https://www.instagram.com/saudeemfoco",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: settings.title || siteName,
              description: settings.description || siteDescription,
              inLanguage: "pt-BR",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>
        <SiteHeader
          categories={categories}
          navigationItems={settings.navigationItems || []}
          logo={logo}
          logoAlt={logoAlt}
        />

        <main className="container">{children}</main>
        <UserPreferenceRuntime />
        <ConsentCenter />

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <span className="logo-badge footer-logo">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    width={120}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </span>
                <p style={{ maxWidth: 300, fontSize: "0.875rem" }}>
                  {settings.footerDescription || settings.description || siteDescription}
                </p>
              </div>
              {(settings.footerColumns || []).map((column) => (
                <div key={column.title}>
                  <h3 style={{ marginBottom: 16, color: "var(--foreground)" }}>{column.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {column.links.map((link) => {
                      const href = link.href || (link.categorySlug ? `/categoria/${link.categorySlug}` : "/");
                      return (
                        <li key={`${column.title}-${link.label}-${href}`}>
                          <Link href={href}>{link.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <p>&copy; {new Date().getFullYear()} {settings.title || siteName}. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
