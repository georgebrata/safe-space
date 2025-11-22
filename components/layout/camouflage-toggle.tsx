"use client"

import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toggleCamouflage } from "@/redux/slices/camouflageSlice"

export const CamouflageToggle = () => {
  const dispatch = useAppDispatch()
  const isActive = useAppSelector((state) => state.camouflage.isActive)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleCamouflage())}
      className="text-muted-foreground"
      aria-label={isActive ? "Dezactivează camuflajul" : "Activează camuflajul"}
    >
      {isActive ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </Button>
  )
}

