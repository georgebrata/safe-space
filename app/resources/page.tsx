"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Phone, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple Badge component inline
function SimpleBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary-foreground border border-secondary/30 ${className}`}
    >
      {children}
    </span>
  )
}

const resources = [
  {
    title: "ANES Helpline",
    description:
      "Helpline național gratuit care funcționează 24h/7 zile pe săptămână creat de către Agenția Națională pentru Egalitate de șanse între Femei și Bărbați (ANES), pentru a semnala situații de violență domestică, hărțuire sexuală, trafic de persoane, discriminare de gen sau discriminare multiplă",
    type: "Linie de ajutor",
    contact: "0800 500 333",
    link: "https://anes.gov.ro/",
  },
  {
    title: "ANITP Helpline",
    description:
      "Linie națională gratuită creată de Agenția Națională împotriva Traficului de Persoane (ANITP) pentru victimele traficului de persoane (sclavie modernă).",
    type: "Linie de ajutor",
    contact: "0800 800 678",
    link: "https://anitp.mai.gov.ro/",
  },
  {
    title: "Numărul Unic 119",
    description:
      "Linie națională gratuită pentru prevenirea și raportarea oricărui tip de abuz sau violență împotriva copiilor. Gestionată de Autoritatea Națională pentru Protecția Drepturilor Copilului și Adopție. Disponibilă 24/7.",
    type: "Linie de ajutor",
    contact: "119",
    link: "https://dingrijapentrucopii.gov.ro/1/numar-unic-119/",
  }
]

const tipuriAbuz = [
  "Violență domestică",
  "Violență verbală",
  "Violenţa psihologică",
  "Violenţa fizică",
  "Violență sexuală",
  "Violenţa economică",
]

const violentaDomesticaText = `Violenţa domestică înseamnă orice inacţiune sau acţiune intenţionată de violenţă fizică, sexuală, psihologică, economică, socială, spirituală sau cibernetică, care se produce în mediul familial sau domestic ori între soţi sau foşti soţi, precum şi între actuali sau foşti parteneri, indiferent dacă agresorul locuieşte sau a locuit împreună cu victima.
Violenţa domestică se poate manifesta sub următoarele forme: violență verbală, psihologică, fizică, sexuală, economică.`;
const violentaVerbalaText = `Adresarea printr-un limbaj jignitor, brutal precum și utilizarea de insulte, amenințări, cuvinte și expresii degradante sau umilitoare reprezintă violență verbală.`;
const violentaPsihologicaText = `Violenţa psihologică se realizează prin impunerea voinţei sau a controlului personal, provocarea de stări de tensiune şi de suferinţă psihică, prin ameninţare verbală sau în orice altă modalitate, şantaj, violenţă demonstrativă asupra obiectelor şi animalelor, afişare ostentativă a armelor, neglijare, controlul vieţii personale, acte de gelozie, constrângeri de orice fel, urmărirea fără drept, supravegherea locuinţei, a locului de muncă sau a altor locuri frecventate de victimă, efectuarea de apeluri telefonice sau alte tipuri de comunicări prin mijloace de transmitere la distanţă, care prin frecvenţă, conţinut sau momentul în care sunt emise creează temere.`;
const violentaFizicaText = `Violenţa fizică reprezintă vătămarea corporală prin lovire, îmbrâncire, trântire, tragere de păr, înţepare, tăiere, ardere, strangulare, muşcare, în orice formă şi de orice intensitate, inclusiv mascate ca fiind rezultatul unor accidente, prin otrăvire, intoxicare, precum şi alte acţiuni cu efect similar, supunerea la eforturi fizice epuizante sau la activităţi cu grad mare de risc pentru viaţă sau sănătate şi integritate corporală.`;
const violentaSexualaText = `Violenţa sexuală se poate manifesta prin agresiune sexuală, impunere de acte degradante, hărţuire, intimidare, manipulare, brutalitate în vederea întreţinerii unor relaţii sexuale forţate, viol, inclusiv viol conjugal. Activitatea sexuală fără consimțământ reprezintă  violenţă sexuală.`;
const violentaEconomicaText = `Violenţa economică se poate manifesta prin interzicerea activităţii profesionale, privare de mijloace economice, inclusiv lipsire de mijloace de existenţă primară, cum ar fi hrană, medicamente, obiecte de primă necesitate, acţiunea de sustragere intenţionată a bunurilor persoanei, interzicerea dreptului de a poseda, folosi şi dispune de bunurile comune, control inechitabil asupra bunurilor şi resurselor comune, refuzul de a susţine familia, impunerea de munci grele şi nocive în detrimentul sănătăţii, inclusiv unui membru de familie minor, precum şi alte acţiuni cu efect similar.`;

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)

  // added search state
  const [searchTerm, setSearchTerm] = useState("")

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(resources.map((res) => res.type)))
    return types.sort()
  }, [])

  // helper to get tip text
  const getTipText = (tip: string) => {
    if (tip === "Violență domestică") return violentaDomesticaText
    if (tip === "Violență verbală") return violentaVerbalaText
    if (tip === "Violenţa psihologică") return violentaPsihologicaText
    if (tip === "Violenţa fizică") return violentaFizicaText
    if (tip === "Violență sexuală") return violentaSexualaText
    if (tip === "Violenţa economică") return violentaEconomicaText
    return ""
  }

  const filteredResources = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    let items = resources

    // filter by selected type (Hotline, etc.) unless the special tab is active
    if (selectedType && selectedType !== "Tipuri de abuz") {
      items = items.filter((res) => res.type === selectedType)
    }

    if (!q) return items

    return items.filter((res) => {
      const hay = (
        (res.title || "") +
        " " +
        (res.description || "") +
        " " +
        (res.type || "") +
        " " +
        (res.contact || "")
      ).toLowerCase()
      return hay.includes(q)
    })
  }, [selectedType, searchTerm])

  // filter tipuriAbuz by search term as well
  const visibleTipuri = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return tipuriAbuz
    return tipuriAbuz.filter((tip) => {
      const hay = (tip + " " + getTipText(tip)).toLowerCase()
      return hay.includes(q)
    })
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">
            Resurse și Suport
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Accesează informații verificate, contacte de urgență și ghiduri educaționale. Folosește bara de căutare pentru a filtra după subiect.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10 h-12"
            placeholder="Caută resurse (ex: 'juridic', 'locuință', 'linie de ajutor')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {uniqueTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`rounded-full transition-all ${
                selectedType === type
                  ? "bg-primary hover:opacity-90 text-primary-foreground shadow-md"
                  : "border-secondary text-primary hover:bg-secondary/10"
              }`}
            >
              {type}
            </Button>
          ))}
          <Button
            variant={selectedType === "Tipuri de abuz" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("Tipuri de abuz")}
            className={`rounded-full transition-all ${
              selectedType === "Tipuri de abuz"
                ? "bg-primary hover:opacity-90 text-primary-foreground shadow-md"
                : "border-secondary text-primary hover:bg-secondary/10"
            }`}
          >
            Tipuri de abuz
          </Button>
        </div>

        {selectedType === "Tipuri de abuz" ? (
          <div className="grid gap-6 grid-cols-1">
            {visibleTipuri.map((tip, idx) => (
              <Card
                key={idx}
                className="hover:border-accent transition-all hover:shadow-lg border-border"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{tip}</CardTitle>
                </CardHeader>
                <CardContent>{getTipText(tip)}</CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1">
            {filteredResources.map((res, idx) => (
              <Card
                key={idx}
                className="hover:border-accent transition-all hover:shadow-lg border-border"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <SimpleBadge className="mb-2">{res.type}</SimpleBadge>
                    {res.link && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <CardTitle className="text-xl">{res.title}</CardTitle>
                  <CardDescription>{res.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {res.contact && (
                    <Button variant="outline" className="w-full mb-2 gap-2 bg-transparent">
                      <Phone className="h-4 w-4" /> {res.contact}
                    </Button>
                  )}
                  <Button
                    className="w-full gap-2 bg-primary hover:opacity-90 text-primary-foreground shadow-md"
                    variant="default"
                    onClick={() => window.open(res.link, "_blank")}
                  >
                    <BookOpen className="h-4 w-4" />
                    {res.contact ? "Vizitează Site-ul" : "Citește Ghidul"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
