import React, { Suspense } from "react"
import ContactSpecialistChat from "./ContactSpecialistClient"

export default function ContactSpecialistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă…</div>}>
      <ContactSpecialistChat />
    </Suspense>
  )
}