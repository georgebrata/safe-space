import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, HeartHandshake, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-dark font-bold text-xl">
            <img src="./logo.png" alt="SafeSpace" className="h-8 w-8" />
            <span>SafeSpace</span>
          </a>
          <nav className="hidden md:flex gap-6">
            <Link href="/resources" className="text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1">
              Resurse
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1">
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

      {/* Hero Section */}
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Nu ești singură.</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Un spațiu sigur, securizat și privat pentru a găsi ajutor, a te conecta cu specialiști și a înțelege opțiunile tale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/risk-form">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg bg-primary hover:bg-primary/90">
                Completează formularul de risc
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent">
                Ce ar trebui să știu?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/help">
            <Card className="group relative overflow-hidden border-primary/20 h-full transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 transition-colors duration-300 group-hover:text-primary">
                  <HeartHandshake className="h-6 w-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  Verificare Siguranță
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                Efectuează o evaluare privată și securizată pentru a înțelege nivelul tău de risc și a primi îndrumări imediate.
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="group relative overflow-hidden border-primary/20 h-full transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 transition-colors duration-300 group-hover:text-accent">
                  <Users className="h-6 w-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-accent" />
                  Comunitate
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                Împărtășește-ți povestea anonim sau ține un jurnal privat. Conectează-te cu alții care înțeleg.
              </CardContent>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="group relative overflow-hidden border-primary/20 h-full transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-lg hover:shadow-accent/20 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 transition-colors duration-300 group-hover:text-accent">
                  <FileText className="h-6 w-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-accent" />
                  Resurse
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">Ghiduri juridice, sfaturi de planificare a siguranței și numere de linii de ajutor disponibile 24/7.</CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
