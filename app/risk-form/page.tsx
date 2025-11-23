"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

type Answer = "yes" | "no" | "nu_stiu" | "nu_sunt_sigura" | null

const QUESTIONS: { id: number; self: string; other: string }[] = [
    {
        id: 1,
        self: "Partenerul dumneavoastră v-a insultat, înjosit sau umilit vreodată în public sau în privat?",
        other: "Partenerul persoanei pe care o ajuți a insultat, înjosit sau umilit-o vreodată în public sau în privat?",
    },
    {
        id: 2,
        self: "Partenerul dumneavoastră încearcă să controleze pe cine vedeți, unde mergeți sau cu cine vorbiți (de exemplu, verificându-vă constant telefonul sau cerându-vă parolele)?",
        other: "Partenerul persoanei pe care o ajuți încearcă să controleze pe cine vede, unde merge sau cu cine vorbește (de ex. verificarea constantă a telefonului sau cererea parolelor)?",
    },
    {
        id: 3,
        self: "V-ați simțit vreodată temător(are) de furia partenerului dumneavoastră sau ați simțit nevoia să fiți mereu în gardă în preajma lui/ei?",
        other: "Persoana pe care o ajuți s-a simțit vreodată temătoare de furia partenerului sau a simțit nevoia să fie mereu în gardă în preajma lui/ei?",
    },
    {
        id: 4,
        self: "Partenerul dumneavoastră vă împiedică să lucrați, să mergeți la școală sau să accesați bani/conturi bancare?",
        other: "Partenerul persoanei pe care o ajuți o împiedică să lucreze, să meargă la școală sau să acceseze bani/conturi bancare?",
    },
    {
        id: 5,
        self: "Partenerul dumneavoastră vă învinovățește pentru comportamentul său abuziv sau de control („Tu m-ai făcut să fac asta”)?",
        other: "Partenerul persoanei pe care o ajuți o învinovățește pentru comportamentul său abuziv sau de control?",
    },
    {
        id: 6,
        self: "Partenerul dumneavoastră v-a împins, v-a pălmuit, v-a bruscat sau v-a imobilizat fizic împotriva voinței dumneavoastră?",
        other: "Partenerul persoanei pe care o ajuți a împins-o, a pălmuit-o, a bruscat-o sau a imobilizat-o fizic împotriva voinței sale?",
    },
    {
        id: 7,
        self: "Partenerul dumneavoastră v-a presat, v-a păcălit sau v-a forțat să aveți activitate sexuală pe care nu ați dorit-o?",
        other: "Partenerul persoanei pe care o ajuți a presat-o, a păcălit-o sau a forțat-o să aibă activitate sexuală nedorită?",
    },
    {
        id: 8,
        self: "Partenerul dumneavoastră vă monitorizează în mod regulat acțiunile, vă urmărește locația sau vă bombardează cu apeluri/mesaje text când sunteți separat(ă)?",
        other: "Partenerul persoanei pe care o ajuți o monitorizează regulat, îi urmărește locația sau o bombardează cu apeluri/mesaje când sunt separați?",
    },
    {
        id: 9,
        self: "Partenerul dumneavoastră v-a amenințat că vă va face rău vouă, sieși, copiilor sau animalelor de companie?",
        other: "Partenerul persoanei pe care o ajuți a amenințat că va face rău persoanei, copiilor ei sau animalelor de companie?",
    },
    {
        id: 10,
        self: "Partenerul dumneavoastră v-a deteriorat sau v-a spart obiecte personale (de exemplu, telefonul, cheile de la mașină, obiecte sentimentale)?",
        other: "Partenerul persoanei pe care o ajuți i-a deteriorat sau i-a spart obiecte personale (de ex. telefon, chei, obiecte sentimentale)?",
    },
]

export default function RiskFormPage() {
    const searchParams = useSearchParams()
    const mode = searchParams?.get("mode") === "other" ? "other" : "self"

    const total = QUESTIONS.length
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<number, Answer>>(
        () =>
            QUESTIONS.reduce((acc, q) => {
                acc[q.id] = null
                return acc
            }, {} as Record<number, Answer>)
    )
    const [submitted, setSubmitted] = useState(false)

    const currentQuestion = QUESTIONS[currentStep]
    const progress = Math.round(((currentStep + 1) / total) * 100)

    // Save answer and auto-advance to next step (or submit if last)
    function handleSelect(id: number, value: Answer) {
        setAnswers((s) => ({ ...s, [id]: value }))

        // small delay for UX (so selection highlight is visible before advancing)
        const advanceDelay = 120
        setTimeout(() => {
            if (currentStep < total - 1) {
                setCurrentStep((s) => s + 1)
            } else {
                setSubmitted(true)
            }
        }, advanceDelay)
    }

    function handleNext() {
        // fallback: in case user uses keyboard submit (Enter) we still advance
        if (answers[currentQuestion.id] == null) return
        if (currentStep < total - 1) {
            setCurrentStep((s) => s + 1)
        } else {
            setSubmitted(true)
        }
    }

    function handleBack() {
        if (currentStep > 0) setCurrentStep((s) => s - 1)
    }

    function handleRestart() {
        setAnswers(
            QUESTIONS.reduce((acc, q) => {
                acc[q.id] = null
                return acc
            }, {} as Record<number, Answer>)
        )
        setCurrentStep(0)
        setSubmitted(false)
    }

    const yesCount = useMemo(
        () => Object.values(answers).filter((v) => v === "yes").length,
        [answers]
    )

    // map question groups to abuse types
    const isYes = (id: number) => answers[id] === "yes"
    const isMaybe = (id: number) => answers[id] === "nu_stiu" || answers[id] === "nu_sunt_sigura"

    const detected: { key: string; label: string; present: boolean; maybe: boolean }[] = [
        { key: "psych", label: "Abuz verbal / psihologic", present: [1, 2, 3, 5].some(isYes), maybe: [1, 2, 3, 5].some(isMaybe) },
        { key: "economic", label: "Abuz economic", present: isYes(4), maybe: isMaybe(4) },
        { key: "physical", label: "Abuz fizic", present: isYes(6), maybe: isMaybe(6) },
        { key: "sexual", label: "Abuz sexual", present: isYes(7), maybe: isMaybe(7) },
        { key: "stalking", label: "Monitorizare / hărțuire", present: isYes(8), maybe: isMaybe(8) },
        { key: "threats", label: "Amenințări", present: isYes(9), maybe: isMaybe(9) },
        { key: "property", label: "Distrugere / deteriorare bunuri", present: isYes(10), maybe: isMaybe(10) },
    ]

    const presentCount = detected.filter((d) => d.present).length
    const maybeCount = detected.filter((d) => d.maybe && !d.present).length

    // Decide binary category: clear signs vs low chance
    const highRiskPresent = detected.some((d) => ["physical", "sexual", "threats"].includes(d.key) && d.present)
    const clearSigns = highRiskPresent || presentCount >= 3

    let severity: "urgent" | "high" | "moderate" | "uncertain" | "low" = "low"
    if (detected.find((d) => ["physical", "sexual", "threats"].includes(d.key) && d.present)) {
        severity = "urgent"
    } else if (presentCount >= 3) {
        severity = "high"
    } else if (presentCount >= 1) {
        severity = "moderate"
    } else if (maybeCount > 0) {
        severity = "uncertain"
    } else {
        severity = "low"
    }

    const recommendation = (() => {
        switch (severity) {
            case "urgent":
                return {
                    title: "Risc iminent identificat",
                    text:
                        "Există semne clare de abuz fizic, sexual sau amenințări. Contactați urgent un specialist pentru sprijin și plan de siguranță.",
                    show112: true,
                }
            case "high":
                return {
                    title: "Semne serioase de abuz",
                    text:
                        "Sunt prezente mai multe tipuri de comportament abuziv. Vă recomandăm să discutați cu un specialist pentru evaluare detaliată, opțiuni legale și sprijin practic.",
                    show112: false,
                }
            case "moderate":
                return {
                    title: "Există îngrijorări",
                    text:
                        "Au fost identificate semne relevante de control sau abuz. Luați în considerare să cereți sprijin — consiliere, linii de ajutor sau servicii locale.",
                    show112: false,
                }
            case "uncertain":
                return {
                    title: "Răspunsuri incomplete",
                    text:
                        "Unele răspunsuri sunt „Nu știu / Nu sunt sigur(ă)”. Dacă aveți îngrijorări, discutați cu un specialist pentru clarificare și pași concreți.",
                    show112: false,
                }
            default:
                return {
                    title: "Nu s-au identificat semne evidente de abuz",
                    text:
                        "Nu s-au identificat semne evidente de abuz pe baza răspunsurilor. Puteți citi resursele noastre pentru mai multă informație sau reveni dacă apar îngrijorări.",
                    show112: false,
                }
        }
    })()

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto max-w-3xl space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Evaluare rapidă —{" "}
                        {mode === "self" ? "Despre tine" : "Despre o altă persoană"}
                    </h1>
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            Înapoi
                        </Button>
                    </Link>
                </header>

                <div>
                    <div className="mb-3 text-sm text-muted-foreground">
                        Pas {currentStep + 1} din {total} • {progress}%
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-2 bg-primary"
                            style={{ width: `${progress}%` }}
                            aria-hidden
                        />
                    </div>
                </div>

                {!submitted ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleNext()
                        }}
                        className="space-y-4"
                    >
                        <div className="p-4 border rounded-md">
                            <p className="mb-3 text-base">
                                {mode === "self"
                                    ? currentQuestion.self
                                    : currentQuestion.other}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <label
                                    className={`px-4 py-2 border rounded cursor-pointer flex items-center gap-2 ${
                                        answers[currentQuestion.id] === "yes"
                                            ? "bg-primary/10"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion.id}`}
                                        value="yes"
                                        checked={answers[currentQuestion.id] === "yes"}
                                        onChange={() => handleSelect(currentQuestion.id, "yes")}
                                        className="mr-1"
                                    />
                                    Da
                                </label>

                                <label
                                    className={`px-4 py-2 border rounded cursor-pointer flex items-center gap-2 ${
                                        answers[currentQuestion.id] === "no"
                                            ? "bg-primary/10"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion.id}`}
                                        value="no"
                                        checked={answers[currentQuestion.id] === "no"}
                                        onChange={() => handleSelect(currentQuestion.id, "no")}
                                        className="mr-1"
                                    />
                                    Nu
                                </label>

                                <label
                                    className={`px-4 py-2 border rounded cursor-pointer flex items-center gap-2 ${
                                        answers[currentQuestion.id] === "nu_stiu"
                                            ? "bg-primary/10"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion.id}`}
                                        value="nu_stiu"
                                        checked={answers[currentQuestion.id] === "nu_stiu"}
                                        onChange={() => handleSelect(currentQuestion.id, "nu_stiu")}
                                        className="mr-1"
                                    />
                                    Nu știu
                                </label>

                                <label
                                    className={`px-4 py-2 border rounded cursor-pointer flex items-center gap-2 ${
                                        answers[currentQuestion.id] === "nu_sunt_sigura"
                                            ? "bg-primary/10"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion.id}`}
                                        value="nu_sunt_sigura"
                                        checked={answers[currentQuestion.id] === "nu_sunt_sigura"}
                                        onChange={() => handleSelect(currentQuestion.id, "nu_sunt_sigura")}
                                        className="mr-1"
                                    />
                                    Nu sunt sigur/ă
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    Înapoi
                                </Button>
                            </div>

                            <div className="flex gap-3">
                                <Button type="button" variant="ghost" onClick={handleRestart}>
                                    Resetează
                                </Button>

                                <Button type="submit" disabled={answers[currentQuestion.id] == null}>
                                    {currentStep < total - 1
                                        ? "Următorul"
                                        : "Vezi rezultatele"}
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="p-4 border rounded-md bg-muted space-y-4">
                        <h2 className="font-semibold text-lg">{recommendation.title}</h2>

                        <p className="text-sm">
                            {recommendation.text}
                        </p>

                        <div>
                            <strong>Tipuri identificate:</strong>
                            <ul className="mt-2 list-disc pl-5 text-sm">
                                {detected.map((d) =>
                                    d.present ? (
                                        <li key={d.key}>{d.label}</li>
                                    ) : d.maybe ? (
                                        <li key={d.key} className="opacity-80">{d.label} (posibil)</li>
                                    ) : null
                                )}
                                {detected.every((d) => !d.present && !d.maybe) && <li>Nu s-au identificat tipuri de abuz</li>}
                            </ul>
                        </div>

                        {recommendation.show112 && (
                            <div className="text-sm text-red-600 font-semibold">
                                Dacă există pericol iminent, sună imediat 112.
                            </div>
                        )}

                        <div className="mt-4">
                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                {clearSigns ? (
                                    <Link href={`/contact-specialist?mode=${mode}`} className="w-full">
                                        <Button className="w-full" variant="default">
                                            Vreau să fiu contactat(ă) de un specialist
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/resources" className="w-full">
                                        <Button variant="outline" className="w-full">
                                            Află mai multe despre prevenire și resurse
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
