"use client"

import RefineProvider from "@/providers/refine-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
	return <RefineProvider>{children}</RefineProvider>
}
