"use client"

import { LoaderCircle } from "lucide-react"

export default function Loading() {
	return (
		<div className="flex min-h-40 items-center justify-center sm:min-h-[calc(100vh-4rem)]">
			<LoaderCircle className="h-10 w-10 animate-spin text-primary" />
		</div>
	)
}
