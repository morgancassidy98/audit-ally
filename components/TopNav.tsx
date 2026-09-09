'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { GitHubIcon, GoogleIcon, MenuIcon, XIcon } from '@/components/icons';
import { UserAvatar } from '@/components/UserAvatar';

const navItems = [
  { href: '/',          label: 'Dashboard' },
  { href: '/audit/new', label: 'New Audit'  },
];

export function TopNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  // Don't render nav for unauthenticated users
  // (middleware handles redirect, this prevents flash)
  if (status === 'unauthenticated') return null;

  return (
    <header className="topnav" role="banner">
      <div className="topnav-inner">
        <div className="topnav-brand">
          <Link href="/" className="topnav-brand-link">
            <span className="topnav-brand-name">Audit Ally</span>
            <span className="topnav-brand-tagline">WCAG Accessibility Audit Tracker and Reporting Tool</span>
          </Link>
        </div>

        {status === 'authenticated' && (
          <button
            type="button"
            className="topnav-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="topnav-links"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        )}

        <nav id="topnav-links" className={`topnav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {status === 'loading' && (
            <div className="topnav-loading" aria-hidden="true" />
          )}

          {status === 'authenticated' && (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`topnav-link ${item.href === '/' ? 'topnav-dashboard-link' : ''} ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <div className="topnav-account-action flex items-center gap-3">
                <Link href="/profile" aria-label="Your profile">
                  <UserAvatar
                    className="topnav-avatar"
                    size={28}
                    name={session.user?.name}
                    email={session.user?.email}
                    image={session.user?.image}
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="btn btn-outline topnav-signin"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}