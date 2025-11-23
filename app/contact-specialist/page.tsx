import React, { Suspense } from "react"
import ContactSpecialistChat from "./ContactSpecialistClient"

export default function ContactSpecialistPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
        <header className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-dark font-bold text-xl">
            <img src="./logo.png" alt="SafeSpace" className="h-8 w-8" />
            <span>SafeSpace</span>
          </a>
        </div>
      </header> 
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă…</div>}>
      <ContactSpecialistChat />
    </Suspense>
    </div>
  )
}