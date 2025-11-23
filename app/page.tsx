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
          {/* <nav className="hidden md:flex gap-6">
            <Link href="/resources" className="text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1">
              Resurse
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1">
              Comunitate
            </Link>
          </nav> */}
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
      <section className="bg-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary tracking-tight">Suport de specialitate pentru prevenirea violenței domestice</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Dacă ești îngrijorat pentru siguranța ta sau a unui apropiat, poți începe aici.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/risk-form?mode=self">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg bg-primary hover:bg-primary/90">
                Sunt eu o victimă?
              </Button>
            </Link>
            <Link href="/risk-form?mode=other">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent">
                Susțin pe cineva
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            <Link href="/resources" className="underline">
              Găsește linii de ajutor și resurse utile
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/contact-specialist">
            <Card className="group relative overflow-hidden border-primary/20 h-full transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                  Vorbește cu un specialist
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                Conectează-te în siguranță cu un specialist pentru evaluare, ghidare și sprijin. Chat-ul este privat; dacă este necesar, vei fi rugat(ă) să completezi evaluarea rapidă înainte de a începe conversația.
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="group relative overflow-hidden border-primary/20 h-full transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-lg cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Comunitate
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                Un spațiu sigur unde poți împărtăși gânduri, experiențe sau încurajări. Alătură-te comunității și vezi ce au postat alții.
              </CardContent>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="group relative overflow-hidden border-primary/20 h-full transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-lg cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  Resurse educaționale
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                Contacte utile 24/7, ghiduri practice și linkuri pentru servicii locale și naționale.
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="mt-auto border-t bg-background">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Ai nevoie de ajutor imediat?</h3>
            <p className="text-muted-foreground">Dacă ești în pericol, sună 112 sau contactează o linie de ajutor din secțiunea Resurse.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/risk-form?mode=self">
              <Button variant="secondary">Începe evaluarea</Button>
            </Link>
            <Link href="/risk-form?mode=other">
              <Button variant="outline">Susține pe cineva</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
