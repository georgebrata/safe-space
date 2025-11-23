"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, Clock, Search } from "lucide-react"
import Link from "next/link"

type ChatMeta = { caseId: string; status?: string; createdAt?: number }

export default function SpecialistDashboard() {
  // load chats from localStorage (keeps previous mock for fallback)
  const casesFromStorage = (() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("contactSpecialist.chats") : null
      if (!raw) return []
      return JSON.parse(raw) as ChatMeta[]
    } catch {
      return []
    }
  })()

  const cases = casesFromStorage.length
    ? casesFromStorage
    : [
        { caseId: "SAFE-2024-8821", status: "În așteptare", createdAt: Date.now() - 1000 * 60 * 10 },
        { caseId: "SAFE-2024-8819", status: "În curs", createdAt: Date.now() - 1000 * 60 * 60 },
        { caseId: "SAFE-2024-8804", status: "Încheiat", createdAt: Date.now() - 1000 * 60 * 60 * 24 },
      ]

  function statusLabel(s?: string) {
    switch (s) {
      case "waiting":
      case "În așteptare":
        return "În așteptare"
      case "ongoing":
      case "În curs":
        return "În curs"
      case "ended":
      case "Încheiat":
        return "Încheiat"
      default:
        return s ?? "—"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div>
              <h1 className="font-bold text-lg">Portal Specialist SafeSpace</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center font-bold">DR</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">Cazuri Urgente în Așteptare</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Conversații Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">98%</div>
              <p className="text-sm text-muted-foreground">Rata de Răspuns</p>
            </CardContent>
          </Card>
        </div>

        {/* Case Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Conversații</h2>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" /> Filtrează
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.length === 0 && (
              <Card>
                <CardContent>Nu există conversații încă.</CardContent>
              </Card>
            )}

            {cases.map((c) => (
              <Link key={c.caseId} href={`/chat/${c.caseId}?role=specialist`} className="block">
                <Card className="hover:shadow-lg transition">
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Caz {c.caseId}</div>
                      <div className="text-sm text-muted-foreground">
                        Tip: {c.status ?? "—"}
                      </div>
                      <div className="text-xs mt-1 text-muted-foreground">Creat: {c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold">{statusLabel(c.status)}</div>
                      <div className="text-xs text-muted-foreground mt-2">Deschide conversația</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
