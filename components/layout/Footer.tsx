'use client';

import Link from 'next/link';
import copy from '@/copy.json';
import { Footer as FooterCopy, NavLink } from '@/lib/types';

export const Footer = () => {
  const { footer }: { footer: FooterCopy } = copy;

  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {footer.copyright}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {footer.links.map((link: NavLink) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
