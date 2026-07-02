"use client"

import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface MiniLoaderProps {
	size?: "sm" | "md" | "lg"
	className?: string
}

const sizes = {
	sm: "h-4 w-4",
	md: "h-5 w-5",
	lg: "h-6 w-6",
}

export default function MiniLoader({ size = "md", className }: MiniLoaderProps) {
	return <Loader2 className={cn("animate-spin text-muted-foreground", sizes[size], className)} />
}
