"use client"

import Link from "next/link"
import { Shield, HeartHandshake, FileText, Users, HelpCircle, Phone } from "lucide-react"
import { useAppSelector } from "@/redux/hooks"
import { CamouflageToggle } from "./camouflage-toggle"

export const Footer = () => {
  const isCamouflaged = useAppSelector((state) => state.camouflage.isActive)
  const currentYear = new Date().getFullYear()

  const usefulLinks = [
    {
      title: "Resurse",
      href: "/resources",
      icon: FileText,
    },
    {
      title: "Comunitate",
      href: "/community",
      icon: Users,
    },
    {
      title: "Obține Ajutor",
      href: "/help",
      icon: HelpCircle,
    },
    {
      title: "Verificare Siguranță",
      href: "/risk-form",
      icon: HeartHandshake,
    },
  ]

  const supportLinks = [
    {
      title: "Urgență: 112",
      href: "tel:112",
      icon: Phone,
    },
    {
      title: "Linia ANES",
      href: "tel:0800500333",
      icon: Phone,
    },
    {
      title: "Linia Copilului",
      href: "tel:116111",
      icon: Phone,
    },
  ]

  if (isCamouflaged) {
    return (
      <footer className="border-t bg-background mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="SafeSpace" className="h-8 w-8" />
                <span className="text-xl font-bold text-dark">SafeSpace</span>
                <CamouflageToggle />
              </div>
              <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                Explorarea cosmosului și descoperirea minunilor universului. Informații despre planete, stele și misiuni spațiale.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Explorare</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/space/missions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <FileText className="h-4 w-4" />
                    Misiuni Spațiale
                  </Link>
                </li>
                <li>
                  <Link href="/space/planets" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Users className="h-4 w-4" />
                    Planete
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resurse</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    NASA
                  </a>
                </li>
                <li>
                  <a href="https://www.esa.int" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    ESA
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} SafeSpace. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Confidențialitatea și siguranța ta sunt prioritatea noastră</span>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="SafeSpace" className="h-8 w-8" />
              <span className="text-xl font-bold text-dark">SafeSpace</span>
              <CamouflageToggle />
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Un spațiu sigur, securizat și privat pentru suport în caz de violență domestică. Găsește ajutor, conectează-te cu specialiști și accesează resurse verificate 24/7.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Link-uri Rapide</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Support & Emergency */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Suport de Urgență</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SafeSpace. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Confidențialitatea și siguranța ta sunt prioritatea noastră</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

