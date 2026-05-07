import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

type Category = {
  id: string;
  name_pt: string | null;
  slug: string;
  parent_id: string | null;
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: absoluteUrl("/logo.png"),
        alt: siteName,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [absoluteUrl("/logo.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  title: "Saude em Foco | Blog focado em SEO",
  description: "Os melhores artigos sobre saude, fitness e bem-estar.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let categories: Category[] = [];
  try {
    const { data } = await supabase.from("categories").select("id, name_pt, slug, parent_id");
    if (data) categories = data as Category[];
  } catch {
    // The categories table may not exist in a fresh local setup.
  }

  const mainNavSlugs = [
    "nutricao-fitness",
    "treino-fitness",
    "mentalidade-habitos",
    "suplementacao-recuperacao",
  ];

  const parentCategories = categories
    .filter((category) => mainNavSlugs.includes(category.slug))
    .sort((a, b) => mainNavSlugs.indexOf(a.slug) - mainNavSlugs.indexOf(b.slug));

  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader categories={categories} parentCategories={parentCategories} />

        <main className="container">{children}</main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <Image
                  src="/logo.png"
                  alt="Saude em Foco"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain", marginBottom: 16 }}
                />
                <p style={{ maxWidth: 300, fontSize: "0.875rem" }}>
                  Os melhores artigos sobre saude, fitness e bem-estar. Transforme seu corpo e mente.
                </p>
              </div>
              <div>
                <h3 style={{ marginBottom: 16, color: "var(--foreground)" }}>Categorias</h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {parentCategories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/?category=${category.slug}`}>{category.name_pt}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ marginBottom: 16, color: "var(--foreground)" }}>Institucional</h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  <li>
                    <Link href="/sobre">Sobre</Link>
                  </li>
                  <li>
                    <Link href="/politica-editorial">Politica editorial</Link>
                  </li>
                  <li>
                    <Link href="/aviso-medico">Aviso medico</Link>
                  </li>
                </ul>
              </div>
            </div>
            <p>&copy; {new Date().getFullYear()} Saude em Foco. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
