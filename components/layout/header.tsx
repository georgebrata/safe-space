"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAppSelector } from "@/redux/hooks"
import { CamouflageToggle } from "./camouflage-toggle"

export const Header = () => {
  const isCamouflaged = useAppSelector((state) => state.camouflage.isActive)

  if (isCamouflaged) {
    return (
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-dark font-bold text-xl">
            <img src="./logo.png" alt="SafeSpace" className="h-8 w-8" />
            <span>SafeSpace</span>
            <CamouflageToggle />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/space/missions" className="text-sm font-medium hover:text-primary">
              Misiuni
            </Link>
            <Link href="/space/planets" className="text-sm font-medium hover:text-primary">
              Planete
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-dark font-bold text-xl">
          <img src="./logo.png" alt="SafeSpace" className="h-8 w-8" />
          <span>SafeSpace</span>
          <CamouflageToggle />
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/resources" className="text-sm font-medium hover:text-primary">
            Resurse
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-primary">
            Comunitate
          </Link>
        </nav>
        <div className="flex gap-2">
          <Link href="/specialist">
            <Button variant="ghost" size="sm">
              Autentificare Specialist
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

