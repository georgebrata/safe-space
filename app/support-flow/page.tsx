"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, MessageSquare, ShieldAlert, UserCheck } from "lucide-react"
import Link from "next/link"
import { useAppSelector } from "@/redux/hooks"

export default function SupportFlowPage() {
  const { result } = useAppSelector((state) => state.riskForm)

  // Fallback if accessed directly without form
  const riskLevel = result || "high"

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card
          className={`border-l-8 ${riskLevel === "critical" ? "border-l-destructive" : "border-l-primary"} shadow-lg`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ShieldAlert className={`h-8 w-8 ${riskLevel === "critical" ? "text-destructive" : "text-primary"}`} />
              We recommend speaking with a specialist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Based on your answers, your situation shows signs of {riskLevel} risk. We have flagged this for our
              specialist team.
            </p>

            <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Check className="h-4 w-4 text-green-600" />
                Case ID generated: #SAFE-2024-8821
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Check className="h-4 w-4 text-green-600" />
                Priority status assigned
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserCheck className="h-4 w-4" />
                Waiting for specialist assignment...
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="hover:border-primary cursor-pointer transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Start Secure Chat</h3>
              <p className="text-sm text-muted-foreground">
                Open a private, encrypted channel with a domestic violence specialist.
              </p>
              <Link href="/chat/new" className="w-full">
                <Button className="w-full">Open Chat</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:border-primary cursor-pointer transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <PhoneCall className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-bold">Call Hotline</h3>
              <p className="text-sm text-muted-foreground">
                Speak immediately with a counselor at the National Hotline.
              </p>
              <Button variant="secondary" className="w-full" asChild>
                <a href="tel:5551234">Call Now</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Missing Icon import fix
import { PhoneCall } from "lucide-react"
