"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function QuickExitButton() {
  const handleQuickExit = () => {
    window.location.replace("https://www.google.com")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
      <Button
        variant="destructive"
        size="lg"
        onClick={handleQuickExit}
        className="shadow-xl rounded-full h-16 w-16 md:h-auto md:w-auto md:rounded-md md:px-8 font-bold text-white bg-red-600 hover:bg-red-700 border-4 border-white/20"
      >
        <span className="hidden md:inline mr-2">Quick Exit</span>
        <LogOut className="h-6 w-6" />
        <span className="sr-only">Quick Exit to Google</span>
      </Button>
    </div>
  )
}
