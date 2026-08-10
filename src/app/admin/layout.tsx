import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Saúde em Foco",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
