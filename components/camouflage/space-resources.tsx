import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Satellite, Telescope, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const spaceResources = [
  {
    title: "NASA - Explorarea Spațiului",
    description: "Resurse oficiale NASA despre misiuni spațiale, imagini din cosmos și descoperiri științifice.",
    type: "Organizație",
    link: "https://www.nasa.gov",
  },
  {
    title: "ESA - Agenția Spațială Europeană",
    description: "Informații despre programele spațiale europene și colaborările internaționale.",
    type: "Organizație",
    link: "https://www.esa.int",
  },
  {
    title: "Ghid de Observare Astronomică",
    description: "Cum să observi planetele, stelele și evenimente astronomice cu ochiul liber sau telescop.",
    type: "Ghid",
    link: "#",
  },
]

export const SpaceResources = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">
            Resurse pentru Explorarea Spațiului
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Accesează informații verificate despre explorarea spațiului, misiuni spațiale și descoperiri astronomice.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {spaceResources.map((res, idx) => (
            <Card key={idx} className="hover:border-accent transition-all hover:shadow-lg border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary-foreground border border-secondary/30">
                    {res.type}
                  </span>
                </div>
                <CardTitle className="text-xl">{res.title}</CardTitle>
                <CardDescription>{res.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full gap-2 bg-primary hover:opacity-90 text-primary-foreground shadow-md"
                  variant="default"
                  onClick={() => res.link !== "#" && window.open(res.link, "_blank")}
                >
                  <BookOpen className="h-4 w-4" />
                  Vizitează Site-ul
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

