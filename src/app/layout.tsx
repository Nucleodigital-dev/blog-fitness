import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
// Trigger HMR
import Image from "next/image";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Saúde em Foco | Blog focado em SEO",
  description: "Os melhores artigos sobre saúde, fitness e bem-estar.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  // Try to fetch categories, handle case where table doesn't exist yet
  let categories: any[] = [];
  try {
    const { data } = await supabase.from('categories').select('id, name_pt, slug, parent_id');
    if (data) categories = data;
  } catch (e) {
    // Table might not exist yet
  }

  const mainNavSlugs = [
    'nutricao-fitness',
    'treino-fitness',
    'mentalidade-habitos',
    'suplementacao-recuperacao'
  ];
  const parentCategories = categories
    .filter(c => mainNavSlugs.includes(c.slug))
    .sort((a, b) => mainNavSlugs.indexOf(a.slug) - mainNavSlugs.indexOf(b.slug));

  return (
    <html lang="pt-BR">
      <body>
        <header className="header">
          <div className="container header-content">
            <Link href="/" className="logo">
              <Image src="/logo.png" alt="Saúde em Foco" width={150} height={50} style={{ objectFit: 'contain' }} />
            </Link>
            <nav style={{ display: 'flex', gap: '24px' }}>
              <Link href="/" style={{ fontWeight: 500, padding: '8px 0' }}>Início</Link>
              {parentCategories.map(cat => {
                const subcategories = categories.filter(sub => sub.parent_id === cat.id);
                
                return (
                  <div key={cat.id} className="nav-item">
                    <Link href={`/?category=${cat.slug}`} style={{ fontWeight: 500 }}>
                      {cat.name_pt}
                    </Link>
                    {subcategories.length > 0 && (
                      <>
                        <ChevronDown size={16} />
                        <div className="dropdown-menu">
                          {subcategories.map(sub => (
                            <Link key={sub.id} href={`/?category=${sub.slug}`}>
                              {sub.name_pt}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </header>
        
        <main className="container">
          {children}
        </main>
        
        <footer className="footer">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32, textAlign: 'left' }}>
              <div>
                <Image src="/logo.png" alt="Saúde em Foco" width={120} height={40} style={{ objectFit: 'contain', marginBottom: 16 }} />
                <p style={{ maxWidth: 300, fontSize: '0.875rem' }}>Os melhores artigos sobre saúde, fitness e bem-estar. Transforme seu corpo e mente.</p>
              </div>
              <div>
                <h3 style={{ marginBottom: 16, color: 'var(--foreground)' }}>Categorias</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {parentCategories.map(cat => (
                    <li key={cat.id}>
                      <Link href={`/?category=${cat.slug}`}>{cat.name_pt}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p>&copy; {new Date().getFullYear()} Saúde em Foco. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
