import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'LesHub',
  description: 'Genereer automatisch een compleet lespakket met PowerPoint, handout en meer.',
};

const NAV_ITEMS = [
  { label: 'Generator',    href: '/' },
  { label: 'AI-Tutor',     href: '/tutor' },
  { label: 'Lespakketten', href: '/lespakketten' },
  { label: 'Abonnement',   href: '/abonnement' },
  { label: 'Dashboard',    href: '/dashboard' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-gray-50 antialiased">

        {/* ── Navigatiebalk ── */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">

            {/* Logo */}
            <Link
              href="/"
              className="mr-4 flex items-center gap-2 text-[#1B2A6B] no-underline"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B2A6B] text-sm font-bold text-white">
                L
              </span>
              <span className="text-base font-bold tracking-tight">LesHub</span>
            </Link>

            {/* Nav links */}
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F0F4FA] hover:text-[#1B2A6B]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Pagina-inhoud ── */}
        <main>{children}</main>

      </body>
    </html>
  );
}
