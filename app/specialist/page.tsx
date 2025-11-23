"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Clock, Search } from "lucide-react"
import Link from "next/link"

type ChatMeta = { caseId: string; status: "waiting" | "ongoing" | "ended"; createdAt: number; mode?: "self" | "other"; lastMessageAt?: number; completed?: any; closed?: boolean }

export default function SpecialistDashboard() {
  const [cases, setCases] = useState<ChatMeta[]>([])

  const CHAT_INDEX = "contactSpecialist.chats"

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAT_INDEX)
      const parsed = raw ? (JSON.parse(raw) as ChatMeta[]) : []
      // sort by lastMessageAt desc
      parsed.sort((a, b) => (b.lastMessageAt || b.createdAt) - (a.lastMessageAt || a.createdAt))
      setCases(parsed)
    } catch {
      setCases([])
    }
  }, [])

  function statusLabel(s: ChatMeta["status"]) {
    switch (s) {
      case "waiting":
        return "În așteptare"
      case "ongoing":
        return "În curs"
      case "ended":
        return "Încheiat"
      default:
        return s
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Specialist Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-lg">Portal Specialist SafeSpace</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center font-bold">DR</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 space-y-8">
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
                <CardContent>
                  Nu există conversații încă.
                </CardContent>
              </Card>
            )}

            {cases.map((c) => (
              <Link key={c.caseId} href={`/chat/${c.caseId}?role=specialist`} className="block">
                <Card className="hover:shadow-lg transition">
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Caz {c.caseId}</div>
                      <div className="text-sm text-muted-foreground">
                        Tip: {c.mode === "self" ? "Pentru pacient" : c.mode === "other" ? "Pentru altă persoană" : "—"}
                      </div>
                      <div className="text-xs mt-1 text-muted-foreground">Ultim mesaj: {c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleString() : new Date(c.createdAt).toLocaleString()}</div>
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
