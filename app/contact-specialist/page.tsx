"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip } from "lucide-react"

type Msg = { id: number; sender: "system" | "me" | "specialist"; text: string; time: string }

export default function ContactSpecialistChat() {
  // NOTE: prototype only — add proper auth/ACL so only the user and their assigned specialist can access
  const [caseId] = useState(() => `CS-${Math.floor(Math.random() * 10000)}`) // random case ID for demo
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: 1,
      sender: "system",
      text:
        "Mesajul tău a fost înregistrat. Un specialist va răspunde în curând. Conversația este privată și va fi preluată de specialistul tău — răspunsul poate întârzia în funcție de disponibilitate.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    {
      id: 2,
      sender: "specialist",
      text:
        "Bună — sunt specialistul asignat. Am văzut evaluarea ta și voi reveni cât de curând. Poți lăsa aici orice informație adițională consideri relevantă.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")

  useEffect(() => {
    // prototype: simulate delayed specialist acknowledgement (optional)
    // const t = setTimeout(() => {
    //   setMessages((m) => [...m, { id: Date.now(), sender: "specialist", text: "Confirm primire. Revin în scurt timp.", time: "Acum" }])
    // }, 8000)
    // return () => clearTimeout(t)
  }, [])

  function sendMessage() {
    if (!input.trim()) return
    const msg: Msg = {
      id: Date.now(),
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((s) => [...s, msg])
    setInput("")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Minimal header */}
      <header className="p-3 border-b bg-primary text-primary-foreground flex items-center justify-between">
        <div>
          <div className="font-semibold">Contact Specialist</div>
          <div className="text-xs opacity-80">Caz {caseId}</div>
        </div>
      </header>

      {/* Messages */}
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

      {/* Input */}
      <div className="p-4 bg-white border-t safe-area-padding">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Scrie un mesaj pentru specialist..."
            className="flex-1 rounded-full bg-secondary/20 border-0 focus-visible:ring-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button size="icon" className="rounded-full h-10 w-10" onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}