import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ReduxProvider } from "@/redux/provider"
import { QuickExitButton } from "@/components/layout/quick-exit-button"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SafeSpace | Suport pentru Violență Domestică",
  description: "Un spațiu sigur pentru suport și resurse.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ReduxProvider>
          <main className="pb-24 md:pb-0 flex-1">{children}</main>
          <Footer />
          <QuickExitButton />
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
