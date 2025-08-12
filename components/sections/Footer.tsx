'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Hash, Mail } from 'lucide-react';

export const Footer = () => {
  const footerLinks = [
    { name: 'Home', href: '#' },
    { name: 'FAQ', href: 'https://graph.one/faq' },
    { name: 'Impressum', href: 'https://graph.one/impressum' },
    { name: 'Privacy Policy', href: 'https://graph.one/privacy-policy' },
    { name: 'Cookie policy', href: 'https://graph.one/cookie-policy' },
    { name: 'Terms & Conditions', href: 'https://graph.one/terms-conditions' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Graph.one logo" width={90} height={90} />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Borg Collective GmbH</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start" aria-label="Footer">
            {footerLinks.map((item) => (
              <div key={item.name} className="px-1 py-1">
                <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex justify-center space-x-6 md:justify-end">
            <Link href="https://graphone-workspace.slack.com/join/shared_invite/zt-2rierkty8-pYFVwsVmWXhzdGzKchio1w#/shared-invite/email" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Slack</span>
              <Hash className="h-5 w-5" />
            </Link>
            <Link href="mailto:info@graph.one" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Email</span>
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
