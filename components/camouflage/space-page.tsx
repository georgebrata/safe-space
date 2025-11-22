import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Planet, Telescope, Star, Satellite } from "lucide-react"

export const SpacePage = ({ title, content }: { title: string; content?: React.ReactNode }) => {
  const defaultContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-primary" />
              Misiuni Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Descoperă cele mai recente misiuni spațiale și explorările planetei Marte, Luna și dincolo.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Planet className="h-6 w-6 text-primary" />
              Sistemul Solar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explorează planetele sistemului nostru solar și află despre caracteristicile unice ale fiecărei planete.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Telescope className="h-6 w-6 text-primary" />
              Observații Astronomice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ghiduri pentru observarea stelelor, planetele vizibile și evenimente astronomice importante.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Star className="h-6 w-6 text-primary" />
              Stele și Galaxii
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Află despre tipurile de stele, ciclul lor de viață și despre galaxia noastră și celelalte galaxii din univers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explorarea cosmosului și descoperirea minunilor universului.
          </p>
        </div>
        {content || defaultContent}
      </div>
    </div>
  )
}

