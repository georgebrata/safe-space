"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function QuickExitButton() {
  const handleCall112 = () => {
    window.location.href = "tel:112"
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <Button
        variant="destructive"
        size="lg"
        onClick={handleCall112}
        className="pointer-events-auto shadow-2xl rounded-full px-8 py-6 md:px-12 md:py-8 font-bold text-white bg-red-600 hover:bg-red-700 border-4 border-white/30 shadow-red-500/50 animate-pulse flex items-center gap-3"
        style={{
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.4), 0 0 90px rgba(239, 68, 68, 0.2)",
        }}
      >
        <Phone className="h-6 w-6 md:h-8 md:w-8" />
        <span className="text-lg md:text-xl">Sună 112</span>
        <span className="sr-only">Sună numărul de urgență 112</span>
      </Button>
    </div>
  )
}
