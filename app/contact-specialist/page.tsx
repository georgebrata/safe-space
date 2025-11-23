"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Msg = { id: number; sender: "system" | "me" | "specialist"; text: string; time: string }
type CompletedRecord = { mode: "self" | "other"; completedAt: number; answers: Record<number, string | null> } | null
type ChatMeta = { caseId: string; status: "waiting" | "ongoing" | "ended"; createdAt: number; mode?: "self" | "other"; lastMessageAt?: number; completed?: CompletedRecord; closed?: boolean }
type SavedChat = { caseId: string; messages: Msg[]; savedAt: number; completed?: CompletedRecord; closed?: boolean }

export default function ContactSpecialistChat() {
  const searchParams = useSearchParams()
  const requestedMode = searchParams?.get("mode")
  const [completed, setCompleted] = useState<CompletedRecord>(null)
  const [loading, setLoading] = useState(true)

  const [caseId, setCaseId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [closed, setClosed] = useState(false)

  const CHAT_INDEX = "contactSpecialist.chats"
  const CHAT_PREFIX = "contactSpecialist.chat."
  const RISK_KEY = "riskForm.completed"

  // Index helpers
  function readIndex(): ChatMeta[] {
    try {
      const raw = localStorage.getItem(CHAT_INDEX)
      return raw ? (JSON.parse(raw) as ChatMeta[]) : []
    } catch {
      return []
    }
  }
  function writeIndex(index: ChatMeta[]) {
    try {
      localStorage.setItem(CHAT_INDEX, JSON.stringify(index))
    } catch {}
  }
  function upsertIndex(meta: ChatMeta) {
    const idx = readIndex()
    const i = idx.findIndex((c) => c.caseId === meta.caseId)
    if (i >= 0) idx[i] = { ...idx[i], ...meta }
    else idx.unshift(meta)
    writeIndex(idx)
  }

  // Merge helper: merge two message arrays by id, keep chronological order (by id)
  function mergeMessages(existing: Msg[], incoming: Msg[]) {
    const map = new Map<number, Msg>()
    ;[...existing, ...incoming].forEach((m) => map.set(m.id, m))
    const merged = Array.from(map.values()).sort((a, b) => a.id - b.id)
    return merged
  }

  // Load completion and chat from localStorage
  useEffect(() => {
    try {
      const rawCompleted = localStorage.getItem(RISK_KEY)
      const parsedCompleted = rawCompleted ? (JSON.parse(rawCompleted) as CompletedRecord) : null
      setCompleted(parsedCompleted)

      // Try to find an existing chat linked to this completion (by completedAt) or legacy keys
      const index = readIndex()
      let foundMeta = null as ChatMeta | null
      if (parsedCompleted) {
        foundMeta = index.find((c) => c.completed?.completedAt === parsedCompleted.completedAt) ?? null
      }
      if (foundMeta) {
        const rawChat = localStorage.getItem(CHAT_PREFIX + foundMeta.caseId)
        if (rawChat) {
          const parsed = JSON.parse(rawChat) as SavedChat
          setCaseId(parsed.caseId)
          setMessages((parsed.messages || []).sort((a, b) => a.id - b.id))
          setClosed(!!parsed.closed)
          setLoading(false)
          return
        }
      }

      // Legacy single-key migration
      const legacy = localStorage.getItem("contactSpecialist.chat")
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy) as SavedChat
          const newId = parsed.caseId ?? `CS-${Math.floor(Math.random() * 100000)}`
          const key = CHAT_PREFIX + newId
          localStorage.setItem(key, JSON.stringify({ ...parsed, caseId: newId }))
          upsertIndex({
            caseId: newId,
            status: parsed.messages?.some((m) => m.sender === "specialist") ? "ongoing" : "waiting",
            createdAt: Date.now(),
            mode: parsed.completed?.mode,
            lastMessageAt: parsed.messages?.length ? parsed.messages[parsed.messages.length - 1].id : Date.now(),
            completed: parsed.completed,
            closed: !!parsed.closed,
          })
          setCaseId(newId)
          setMessages((parsed.messages || []).sort((a, b) => a.id - b.id))
          setClosed(!!parsed.closed)
          setLoading(false)
          return
        } catch {}
      }

      // Create a new per-case chat if the user completed assessment
      if (parsedCompleted) {
        const newCaseId = `CS-${Math.floor(Math.random() * 100000)}`
        setCaseId(newCaseId)
        const initial: Msg[] = [
          {
            id: Date.now(),
            sender: "system",
            text:
              "Mesajul tău a fost înregistrat. Un specialist va răspunde în curând. Conversația este privată și va fi preluată de specialistul tău — răspunsul poate întârzia în funcție de disponibilitate.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]
        setMessages(initial)
        setClosed(false)
        try {
          localStorage.setItem(CHAT_PREFIX + newCaseId, JSON.stringify({ caseId: newCaseId, messages: initial, savedAt: Date.now(), completed: parsedCompleted, closed: false }))
          upsertIndex({
            caseId: newCaseId,
            status: "waiting",
            createdAt: Date.now(),
            mode: parsedCompleted.mode,
            lastMessageAt: Date.now(),
            completed: parsedCompleted,
            closed: false,
          })
        } catch {}
      }

      setLoading(false)
    } catch {
      setCompleted(null)
      setCaseId(null)
      setMessages([])
      setClosed(false)
      setLoading(false)
    }
  }, [])

  // Persist per-case chat messages and update index whenever messages/closed change
  useEffect(() => {
    if (!caseId) return
    try {
      const storageKey = CHAT_PREFIX + caseId
      const rawExisting = localStorage.getItem(storageKey)
      const existing = rawExisting ? (JSON.parse(rawExisting) as SavedChat).messages || [] : []
      const merged = mergeMessages(existing, messages)
      // If merged differs from current state, update state (this ensures both sides' messages are visible)
      const same =
        merged.length === messages.length && merged.every((m, i) => messages[i] && m.id === messages[i].id)
      if (!same) {
        setMessages(merged)
      }
      // persist merged (we persist the merged set to canonical storage)
      localStorage.setItem(storageKey, JSON.stringify({ caseId, messages: merged, savedAt: Date.now(), completed, closed }))
      // Update index meta
      const meta: ChatMeta = {
        caseId,
        status: closed ? "ended" : merged.some((m) => m.sender === "specialist") ? "ongoing" : "waiting",
        createdAt: Date.now(),
        mode: completed?.mode,
        lastMessageAt: merged.length ? merged[merged.length - 1].id : Date.now(),
        completed,
        closed,
      }
      upsertIndex(meta)
    } catch {}
  }, [messages, caseId, closed, completed])

  function sendMessage() {
    if (closed) return
    if (!input.trim()) return
    const msg: Msg = {
      id: Date.now(),
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((s) => mergeMessages(s, [msg]))
    setInput("")
  }

  function endConversation() {
    setClosed(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Se încarcă…</div>
      </div>
    )
  }

  if (!completed) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-start justify-center">
        <div className="max-w-2xl w-full p-6 border rounded-md bg-white">
          <h1 className="text-2xl font-semibold mb-2">Chat cu specialistul — acces restricționat</h1>
          <p className="text-sm mb-4">
            Acest chat este disponibil doar după ce ai completat evaluarea rapidă. Înainte de a contacta un specialist, completarea chestionarului ne ajută să înțelegem situația și să alocăm un specialist potrivit.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/risk-form?mode=self" className="w-full">
              <Button className="w-full">Completează acum — Pentru tine</Button>
            </Link>
            <Link href="/risk-form?mode=other" className="w-full">
              <Button variant="outline" className="w-full">Completează pentru altă persoană</Button>
            </Link>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Dacă ai terminat deja evaluarea și tot primești acest mesaj, încearcă să reîncarci pagina sau verifică setările browserului (blocare `localStorage`).
          </div>
        </div>
      </div>
    )
  }

  const completedMode = completed.mode
  const completedTime = new Date(completed.completedAt).toLocaleString()

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-3 border-b bg-primary text-primary-foreground flex items-center justify-between">
        <div>
          <div className="font-semibold">Contact Specialist</div>
          <div className="text-xs opacity-80">Caz {caseId}</div>
          <div className="text-xs opacity-80 mt-1">Evaluare finalizată: {completedTime} • Tip: {completedMode === "self" ? "Pentru tine" : "Pentru altă persoană"}</div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">Spre pagina principală</Button>
          </Link>
          <Button
            variant={closed ? "secondary" : "destructive"}
            size="sm"
            onClick={() => {
              if (!closed) {
                if (!confirm("Ești sigur(ă) că dorești să închei conversația? După această acțiune nu se vor mai putea trimite mesaje.")) return
                endConversation()
              }
            }}
            disabled={closed}
          >
            Încheie conversația
          </Button>
        </div>
      </header>

      {closed && (
        <div className="p-3 bg-yellow-50 text-sm border-b text-muted-foreground">
          Conversația a fost încheiată — nu se mai pot trimite mesaje.
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
            {m.sender === "system" ? (
              <div className="w-full text-center text-xs text-muted-foreground my-4">
                <span className="inline-block bg-secondary/30 px-3 py-2 rounded-full">{m.text}</span>
                <div className="mt-1 text-[10px] text-muted-foreground">{m.time}</div>
              </div>
            ) : (
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                  m.sender === "me" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-white text-foreground rounded-tl-none"
                }`}
              >
                <p className="text-sm">{m.text}</p>
                <p className={`text-[10px] mt-1 text-right ${m.sender === "me" ? "opacity-70" : "text-muted-foreground"}`}>{m.time}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t safe-area-padding">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" disabled={closed}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder={closed ? "Conversația este încheiată" : "Scrie un mesaj pentru specialist..."}
            className="flex-1 rounded-full bg-secondary/20 border-0 focus-visible:ring-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={closed}
          />
          <Button size="icon" className="rounded-full h-10 w-10" onClick={sendMessage} disabled={closed}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}