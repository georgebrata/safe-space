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
          <div className="flex items-center gap-2 text-dark font-bold text-xl">
            <img src="./logo.png" alt="SafeSpace" className="h-8 w-8" />
            <span>SafeSpace</span>
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

      {/* Hero Section */}
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Nu ești singură.</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Un spațiu sigur, securizat și privat pentru a găsi ajutor, a te conecta cu specialiști și a înțelege opțiunile tale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg bg-primary hover:bg-primary/90">
                Obține Ajutor Acum
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent">
                Vezi Resurse
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/help">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                  Verificare Siguranță
                </CardTitle>
              </CardHeader>
              <CardContent>
                Efectuează o evaluare privată și securizată pentru a înțelege nivelul tău de risc și a primi îndrumări imediate.
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Comunitate
                </CardTitle>
              </CardHeader>
              <CardContent>
                Împărtășește-ți povestea anonim sau ține un jurnal privat. Conectează-te cu alții care înțeleg.
              </CardContent>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  Resurse
                </CardTitle>
              </CardHeader>
              <CardContent>Ghiduri juridice, sfaturi de planificare a siguranței și numere de linii de ajutor disponibile 24/7.</CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
