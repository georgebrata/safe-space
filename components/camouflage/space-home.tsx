import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Telescope, Star } from "lucide-react"
import Link from "next/link"

export const SpaceHome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Explorarea Cosmosului
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Descoperă minunile universului, planetele, stelele și galaxiile. O călătorie prin spațiul cosmic ne așteaptă.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/space/missions">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg bg-primary hover:bg-primary/90">
                Misiuni Spațiale
              </Button>
            </Link>
            <Link href="/space/planets">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent">
                Explorează Planete
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Rocket className="h-6 w-6 text-primary" />
                Misiuni Spațiale
              </CardTitle>
            </CardHeader>
            <CardContent>
              Află despre cele mai importante misiuni spațiale din istorie și viitorul explorării spațiului cosmic.
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Star className="h-6 w-6 text-primary" />
                Planete și Stele
              </CardTitle>
            </CardHeader>
            <CardContent>
              Explorează planetele sistemului solar, exoplanete și stelele din galaxia noastră și dincolo.
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Telescope className="h-6 w-6 text-primary" />
                Observații Astronomice
              </CardTitle>
            </CardHeader>
            <CardContent>
              Ghiduri pentru observarea stelelor, planetele vizibile și evenimente astronomice importante.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

