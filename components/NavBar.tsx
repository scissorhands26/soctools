'use client'
import { MenuIcon, ShieldIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function NavBar() {
  return (
    <header className="bg-slate-950 text-white py-6 px-4 md:px-6">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <ShieldIcon className="w-6 h-6" />
          <span className="text-xl font-bold">SOC Tools</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {/* <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Features
          </Link> */}
          {/* <Link
            href="apps"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Apps
          </Link> */}
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Resources
          </Link>
          <Link
            href="/tools"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Tools
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  )
}
