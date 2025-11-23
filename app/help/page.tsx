"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowRight, PhoneCall } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HelpGateway() {
  const router = useRouter()

  const handleUrgent = () => {
    window.location.href = "tel:112"
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Verificare Siguranță</h1>
          <p className="text-muted-foreground">Înainte de a începe, <br/> trebuie să știm dacă ești în pericol imediat.</p>
        </div>

        <Card className="border-destructive/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              Este urgent?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm mb-6">
             Îți este teamă pentru siguranța ta?
            </p>

            <Button
              variant="destructive"
              size="lg"
              className="w-full h-16 text-xl font-bold animate-pulse"
              onClick={handleUrgent}
            >
              <PhoneCall className="mr-2 h-6 w-6" />
              Sună linie de urgență
            </Button>

            <Link href="/risk-form" className="block w-full">
              <Button variant="outline" size="lg" className="w-full h-14 text-lg bg-transparent">
                Nu, sunt în siguranță acum
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
