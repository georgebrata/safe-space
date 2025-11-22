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
      className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/50 ${className}`}
    >
      {children}
    </span>
  )
}

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-background to-rose-50/30 dark:from-pink-950/20 dark:via-background dark:to-rose-950/20 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
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
                ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-200 dark:shadow-pink-900/50"
                : "border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/30"
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
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-200 dark:shadow-pink-900/50"
                  : "border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/30"
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
              className="hover:border-pink-300 dark:hover:border-pink-700 transition-all hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-pink-900/20 border-pink-100 dark:border-pink-900/30"
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
                  className="w-full gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-200 dark:shadow-pink-900/50"
                  variant="default"
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
