"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, Send, MoreVertical, Phone } from "lucide-react"
import Link from "next/link"

export default function ChatInterface({ params }: { params: { caseId: string } }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "You have been connected with Specialist Sarah. This chat is end-to-end encrypted.",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "specialist",
      text: "Hello. I'm Sarah, a crisis counselor. I've reviewed your risk assessment. I'm here to listen and help you find safety. Are you in a safe place to talk right now?",
      time: "10:01 AM",
    },
  ])
  const [inputText, setInputText] = useState("")

  const sendMessage = () => {
    if (!inputText.trim()) return
    setMessages([...messages, { id: Date.now(), sender: "me", text: inputText, time: "Now" }])
    setInputText("")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/support-flow">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-bold">Sarah (Specialist)</h1>
            <p className="text-xs opacity-80">Online • Case #{params.caseId || "NEW"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
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
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-white text-foreground rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${msg.sender === "me" ? "opacity-70" : "text-muted-foreground"}`}
                >
                  {msg.time}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t shrink-0 safe-area-padding">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-secondary/20 border-0 focus-visible:ring-1"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
