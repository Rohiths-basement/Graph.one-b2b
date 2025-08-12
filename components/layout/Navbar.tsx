import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import copy from '@/copy.json';

export const Navbar = () => {
  const { nav } = copy;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-transparent transition-all duration-300">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Graph.one Logo" width={200} height={40} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost">{nav.cta1}</Button>
          <Button>{nav.cta2}</Button>
        </div>
        {/* Mobile menu can be added here */}
      </div>
    </header>
  );
};
