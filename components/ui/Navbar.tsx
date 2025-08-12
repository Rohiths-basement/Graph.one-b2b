'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './button';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.png" alt="Graph.one logo" width={180} height={180} />
          
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="#">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="#">Request Demo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
