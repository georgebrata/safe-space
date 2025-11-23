import React, { Suspense } from "react"
import RiskFormClient from "./RiskFormClient"

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă…</div>}>
            <RiskFormClient />
        </Suspense>
    )
}
