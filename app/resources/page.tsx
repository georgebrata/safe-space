"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Phone, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple Badge component inline
function SimpleBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold bg-[var(--pastel-pink)] dark:bg-[var(--cherry-blossom)] text-[var(--petal-rouge)] dark:text-[var(--cotton-candy)] border border-[var(--cherry-blossom)] dark:border-[var(--cotton-candy)] ${className}`}
      style={{
        backgroundColor: "var(--pastel-pink)",
      }}
    >
      {children}
    </span>
  )
}

const resources = [
  {
    title: "ANES Helpline",
    description:
      "National free helpline operating 24/7 created by the National Agency for Equal Opportunities between Women and Men (ANES) to report domestic violence, sexual harassment, human trafficking, gender discrimination or multiple discrimination.",
    type: "Hotline",
    contact: "0800 500 333",
    link: "https://anes.gov.ro/",
  },
  {
    title: "Helpline Antidepresie",
    description:
      "Free depression helpline providing primary support for depression and anxiety, managed by DepreHub Association.",
    type: "Hotline",
    contact: "0374456420",
    link: "https://deprehub.ro/",
  },
  {
    title: "ANITP Helpline",
    description:
      "National free helpline created by the National Agency Against Human Trafficking (ANITP) for victims of human trafficking (modern slavery).",
    type: "Hotline",
    contact: "0800 800 678",
    link: "https://anitp.mai.gov.ro/",
  },
  {
    title: "Telefonul Copilului",
    description:
      "National free helpline for children and adolescents managed by Telefonul Copilului Association for reporting child abuse, violations of children's rights, or any other problem involving a child. Available Monday-Friday 10:00-20:00.",
    type: "Hotline",
    contact: "116 111",
    link: "https://telefonulcopilului.ro/",
  },
  {
    title: "Numărul Unic 119",
    description:
      "National free helpline for preventing and reporting any kind of abuse or violence against children. Managed by the National Authority for the Protection of Children's Rights and Adoption. Available 24/7.",
    type: "Hotline",
    contact: "119",
    link: "https://dingrijapentrucopii.gov.ro/1/numar-unic-119/",
  },
  {
    title: "Telefonul Vârstnicului",
    description:
      "Free and confidential helpline offering support and counseling for elderly people. Supported by the Royal Foundation Margareta of Romania. Available Monday-Friday 08:00-20:00, Saturday 08:00-16:00.",
    type: "Hotline",
    contact: "0800 460 001",
    link: "https://www.telefonulvarstnicului.ro/",
  },
]

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(resources.map((res) => res.type)))
    return types.sort()
  }, [])

  const filteredResources = useMemo(() => {
    if (!selectedType) return resources
    return resources.filter((res) => res.type === selectedType)
  }, [selectedType])

  return (
    <div className="min-h-screen bg-[var(--soft-blush)] p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[var(--petal-rouge)]">
            Resources & Support
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Access verified information, emergency contacts, and educational guides. Use the search bar to filter by
            topic.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-12" placeholder="Search resources (e.g., 'legal', 'housing', 'hotline')..." />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(null)}
            className={`rounded-full transition-all ${
              selectedType === null
                ? "bg-[var(--petal-rouge)] hover:opacity-90 text-white shadow-md"
                : "border-[var(--cherry-blossom)] text-[var(--petal-rouge)] hover:bg-[var(--pastel-pink)]"
            }`}
          >
            All
          </Button>
          {uniqueTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`rounded-full transition-all ${
                selectedType === type
                  ? "bg-[var(--petal-rouge)] hover:opacity-90 text-white shadow-md"
                  : "border-[var(--cherry-blossom)] text-[var(--petal-rouge)] hover:bg-[var(--pastel-pink)]"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredResources.map((res, idx) => (
            <Card
              key={idx}
              className="hover:border-[var(--cotton-candy)] transition-all hover:shadow-lg border-[var(--pastel-pink)]"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <SimpleBadge className="mb-2">{res.type}</SimpleBadge>
                  {res.link && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </div>
                <CardTitle className="text-xl">{res.title}</CardTitle>
                <CardDescription>{res.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {res.contact && (
                  <Button variant="outline" className="w-full mb-2 gap-2 bg-transparent">
                    <Phone className="h-4 w-4" /> {res.contact}
                  </Button>
                )}
                <Button
                  className="w-full gap-2 hover:opacity-90 text-white shadow-md"
                  variant="default"
                  onClick={() => window.open(res.link, "_blank")}
                >
                  <BookOpen className="h-4 w-4" />
                  {res.contact ? "Visit Website" : "Read Guide"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
