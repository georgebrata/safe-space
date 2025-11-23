"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, Send, MoreVertical, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Msg = { id: number; sender: "system" | "me" | "specialist"; text: string; time: string }
type SavedChat = { caseId: string; messages: Msg[]; savedAt: number; completed?: any; closed?: boolean }
type ChatMeta = { caseId: string; status: "waiting" | "ongoing" | "ended"; createdAt: number; mode?: string; lastMessageAt?: number; completed?: any; closed?: boolean }

export default function ChatInterface({ params }: { params: Promise<{ caseId: string }> | { caseId: string } }) {
  // Unwrap params promise in client component per Next guidance
  // @ts-ignore
  const resolvedParams = (React as any).use ? (React as any).use(params) : (params as any)
  const caseId = resolvedParams?.caseId

  const searchParams = useSearchParams()
  const role = searchParams?.get("role") === "specialist" ? "specialist" : "user"

  const CHAT_PREFIX = "contactSpecialist.chat."
  const CHAT_INDEX = "contactSpecialist.chats"
  const LEGACY_KEY = "contactSpecialist.chat"

  const [messages, setMessages] = useState<Msg[]>([])
  const [inputText, setInputText] = useState("")
  const [closed, setClosed] = useState(false)

  function readIndex(): ChatMeta[] {
    try {
      const raw = localStorage.getItem(CHAT_INDEX)
      return raw ? (JSON.parse(raw) as ChatMeta[]) : []
    } catch {
      return []
    }
  }
  function writeIndex(idx: ChatMeta[]) {
    try {
      localStorage.setItem(CHAT_INDEX, JSON.stringify(idx))
    } catch {}
  }
  function updateIndexStatus(caseIdParam: string, updater: Partial<ChatMeta>) {
    const idx = readIndex()
    const found = idx.find((i) => i.caseId === caseIdParam)
    if (found) Object.assign(found, updater)
    else {
      idx.unshift({
        caseId: caseIdParam,
        status: (updater.status as ChatMeta["status"]) ?? "waiting",
        createdAt: updater.createdAt ?? Date.now(),
        lastMessageAt: updater.lastMessageAt ?? Date.now(),
        mode: updater.mode,
        completed: updater.completed,
        closed: !!updater.closed,
      })
    }
    writeIndex(idx)
  }

  // merge helper
  function mergeMessages(existing: Msg[], incoming: Msg[]) {
    const map = new Map<number, Msg>()
    ;[...existing, ...incoming].forEach((m) => map.set(m.id, m))
    const merged = Array.from(map.values()).sort((a, b) => a.id - b.id)
    return merged
  }

  // Attempt to load saved chat with robust fallbacks
  useEffect(() => {
    if (!caseId) return

    try {
      // 1) direct per-case key
      const directKey = CHAT_PREFIX + caseId
      const rawDirect = localStorage.getItem(directKey)
      if (rawDirect) {
        const parsed = JSON.parse(rawDirect) as SavedChat
        setMessages((parsed.messages || []).sort((a, b) => a.id - b.id))
        setClosed(!!parsed.closed)
        updateIndexStatus(caseId, {
          status: parsed.closed ? "ended" : parsed.messages?.some((m) => m.sender === "specialist") ? "ongoing" : "waiting",
          lastMessageAt: parsed.messages?.length ? parsed.messages[parsed.messages.length - 1].id : Date.now(),
          createdAt: parsed.savedAt ?? Date.now(),
          completed: parsed.completed,
          closed: !!parsed.closed,
        })
        return
      }

      // 2) search all localStorage keys for a saved chat containing the caseId (handles migrations)
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key) continue
        if (key.startsWith(CHAT_PREFIX) || key === LEGACY_KEY) {
          try {
            const raw = localStorage.getItem(key)
            if (!raw) continue
            const parsed = JSON.parse(raw) as SavedChat
            if (parsed?.caseId === caseId) {
              const canonicalKey = CHAT_PREFIX + caseId
              if (key !== canonicalKey) {
                try {
                  localStorage.setItem(canonicalKey, JSON.stringify({ ...parsed, caseId }))
                } catch {}
              }
              setMessages((parsed.messages || []).sort((a, b) => a.id - b.id))
              setClosed(!!parsed.closed)
              updateIndexStatus(caseId, {
                status: parsed.closed ? "ended" : parsed.messages?.some((m) => m.sender === "specialist") ? "ongoing" : "waiting",
                lastMessageAt: parsed.messages?.length ? parsed.messages[parsed.messages.length - 1].id : Date.now(),
                createdAt: parsed.savedAt ?? Date.now(),
                completed: parsed.completed,
                closed: !!parsed.closed,
              })
              return
            }
          } catch {
            // ignore parse errors
          }
        }
      }

      // 3) fallback: seed and persist initial system message
      const init: Msg[] = [
        {
          id: Date.now(),
          sender: "system",
          text: `Caz ${caseId} — conversație inițiată.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]
      try {
        localStorage.setItem(CHAT_PREFIX + caseId, JSON.stringify({ caseId, messages: init, savedAt: Date.now(), closed: false }))
      } catch {}
      setMessages(init)
      updateIndexStatus(caseId, { status: "waiting", createdAt: Date.now(), lastMessageAt: Date.now(), closed: false })
    } catch {
      setMessages([])
    }
  }, [caseId])

  // persist messages and update index on change — merge with existing stored messages
  useEffect(() => {
    if (!caseId) return
    try {
      const storageKey = CHAT_PREFIX + caseId
      const rawExisting = localStorage.getItem(storageKey)
      const existing = rawExisting ? (JSON.parse(rawExisting) as SavedChat).messages || [] : []
      const merged = mergeMessages(existing, messages)
      // avoid unnecessary state updates: only set if different
      const needSync =
        merged.length !== messages.length || merged.some((m, i) => !messages[i] || m.id !== messages[i].id)
      if (needSync) {
        setMessages(merged)
      }
      // persist merged
      localStorage.setItem(storageKey, JSON.stringify({ caseId, messages: merged, savedAt: Date.now(), closed }))
      updateIndexStatus(caseId, {
        status: closed ? "ended" : merged.some((m) => m.sender === "specialist") ? "ongoing" : "waiting",
        lastMessageAt: merged.length ? merged[merged.length - 1].id : Date.now(),
        closed,
      })
    } catch {}
  }, [messages, caseId, closed])

  const sendMessage = () => {
    if (closed) return
    if (!inputText.trim()) return
    const msg: Msg = {
      id: Date.now(),
      sender: role === "specialist" ? "specialist" : "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((m) => mergeMessages(m, [msg]))
    setInputText("")
  }

  const endConversation = () => {
    if (!confirm("Închei conversația? După această acțiune nu se vor mai putea trimite mesaje.")) return
    setClosed(true)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <Link href={role === "specialist" ? "/specialist" : "/"}>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-bold">Caz {caseId}</h1>
            <p className="text-xs opacity-80">{role === "specialist" ? "Tip: Specialist — Răspunde clientului" : "Vizualizare client"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={endConversation} disabled={closed}>
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setClosed(true)} disabled={closed}>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "system" ? (
              <div className="w-full text-center text-xs text-muted-foreground my-4">
                <span className="bg-secondary/50 px-3 py-1 rounded-full">{msg.text}</span>
              </div>
            ) : (
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                  msg.sender === "me" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-white text-foreground rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.sender === "me" ? "opacity-70" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t shrink-0 safe-area-padding">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" disabled={closed}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder={closed ? "Conversația este încheiată" : "Scrie un mesaj..."}
            className="flex-1 rounded-full bg-secondary/20 border-0 focus-visible:ring-1"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
