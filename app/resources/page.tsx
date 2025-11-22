import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Phone, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple Badge component inline
function SimpleBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground ${className}`}
    >
      {children}
    </span>
  )
}

export default function ResourcesPage() {
  const resources = [
    {
      title: "National Domestic Violence Hotline",
      description: "24/7 confidential support for anyone experiencing domestic violence.",
      type: "Hotline",
      contact: "1-800-799-7233",
      link: "https://www.thehotline.org",
    },
    {
      title: "Safety Planning Guide",
      description: "A comprehensive guide on how to create a personalized safety plan.",
      type: "Guide",
      link: "/guides/safety-planning",
    },
    {
      title: "Legal Aid Society",
      description: "Free legal services for low-income families and domestic violence victims.",
      type: "Legal",
      link: "https://www.legalaid.org",
    },
    {
      title: "Financial Independence Fund",
      description: "Grants and support for survivors seeking financial autonomy.",
      type: "Financial",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">Resources & Support</h1>
          <p className="text-muted-foreground max-w-2xl">
            Access verified information, emergency contacts, and educational guides. Use the search bar to filter by
            topic.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-12" placeholder="Search resources (e.g., 'legal', 'housing', 'hotline')..." />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((res, idx) => (
            <Card key={idx} className="hover:border-primary/50 transition-colors">
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
                <Button className="w-full gap-2" variant="secondary">
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
