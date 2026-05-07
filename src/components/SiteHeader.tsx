"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

type Category = {
  id: string;
  name_pt: string | null;
  slug: string;
  parent_id: string | null;
};

type SiteHeaderProps = {
  categories: Category[];
  parentCategories: Category[];
};

const institutionalLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/politica-editorial", label: "Politica editorial" },
  { href: "/aviso-medico", label: "Aviso medico" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader({ categories, parentCategories }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image src="/logo.png" alt="Saude em Foco" width={150} height={50} style={{ objectFit: "contain" }} />
        </Link>

        <nav className="desktop-nav" aria-label="Navegacao principal">
          <Link className={isActivePath(pathname, "/") ? "nav-link active" : "nav-link"} href="/">
            Inicio
          </Link>
          {parentCategories.map((cat) => {
            const subcategories = categories.filter((sub) => sub.parent_id === cat.id);

            return (
              <div key={cat.id} className="nav-item">
                <Link className="nav-link" href={`/?category=${cat.slug}`}>
                  {cat.name_pt}
                </Link>
                {subcategories.length > 0 && (
                  <>
                    <ChevronDown size={16} aria-hidden="true" />
                    <div className="dropdown-menu">
                      {subcategories.map((sub) => (
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
          <Link className={isActivePath(pathname, "/sobre") ? "nav-link active" : "nav-link"} href="/sobre">
            Sobre
          </Link>
        </nav>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-menu" className={isOpen ? "mobile-menu open" : "mobile-menu"}>
        <div className="container mobile-menu-inner">
          <nav aria-label="Menu mobile">
            <Link className="mobile-menu-link primary" href="/" onClick={closeMenu}>
              Inicio
            </Link>

            {parentCategories.map((cat) => {
              const subcategories = categories.filter((sub) => sub.parent_id === cat.id);

              return (
                <details key={cat.id} className="mobile-menu-group">
                  <summary>
                    <span>{cat.name_pt}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <div>
                    <Link href={`/?category=${cat.slug}`} onClick={closeMenu}>
                      Ver todos
                    </Link>
                    {subcategories.map((sub) => (
                      <Link key={sub.id} href={`/?category=${sub.slug}`} onClick={closeMenu}>
                        {sub.name_pt}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}

            <div className="mobile-menu-section">
              <p>Institucional</p>
              {institutionalLinks.map((link) => (
                <Link key={link.href} className="mobile-menu-link" href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
