"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function QuickExitButton() {
  // URL destinatie - schimbă aici dacă ai alt URL exact pentru "Jamila cuisine"
  const DESTINATION = "https://jamilacuisine.ro/"

  const handleGoToDestination = () => {
    // navigare imediată către site inofensiv
    window.location.href = DESTINATION
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={handleGoToDestination}
        className="pointer-events-auto rounded-full px-3 py-2 font-medium text-white bg-red-600 hover:bg-red-700 shadow-md border border-white/20"
        aria-label="Ieșire rapidă"
      >
        <div className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm">Ieșire rapidă</span>
        </div>
      </Button>
    </div>
  )
}
