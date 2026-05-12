"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { SitePreferenceControls } from "@/components/SitePreferenceControls";

type Category = {
  id: string;
  name_pt: string | null;
  slug: string;
  parent_id: string | null;
};

type NavItem = {
  label: string;
  href?: string | null;
  categorySlug?: string | null;
};

type SiteHeaderProps = {
  categories: Category[];
  navigationItems: NavItem[];
  logo: string;
  logoAlt: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function resolveHref(item: NavItem) {
  if (item.href) return item.href;
  if (item.categorySlug) return `/?category=${item.categorySlug}`;
  return "/";
}

function getSubcategories(item: NavItem, categories: Category[]) {
  if (!item.categorySlug) return [];
  const category = categories.find((cat) => cat.slug === item.categorySlug);
  return category ? categories.filter((sub) => sub.parent_id === category.id) : [];
}

export function SiteHeader({ categories, navigationItems, logo, logoAlt }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image src={logo} alt={logoAlt} width={150} height={50} style={{ objectFit: "contain" }} />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => {
            const href = resolveHref(item);
            const subcategories = getSubcategories(item, categories);

            return (
              <div key={`${item.label}-${href}`} className="nav-item">
                <Link className={isActivePath(pathname, href) ? "nav-link active" : "nav-link"} href={href}>
                  {item.label}
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
        </nav>

        <SitePreferenceControls />

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
            {navigationItems.map((item) => {
              const href = resolveHref(item);
              const subcategories = getSubcategories(item, categories);

              if (subcategories.length === 0) {
                return (
                  <Link
                    key={`${item.label}-${href}`}
                    className={href === "/" ? "mobile-menu-link primary" : "mobile-menu-link"}
                    href={href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <details key={`${item.label}-${href}`} className="mobile-menu-group">
                  <summary>
                    <span>{item.label}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <div>
                    <Link href={href} onClick={closeMenu}>
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
          </nav>
        </div>
      </div>
    </header>
  );
}
