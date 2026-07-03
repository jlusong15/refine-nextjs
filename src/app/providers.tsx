"use client"

import AppInitializer from "@/components/AppInitializer"
import RefineProvider from "@/providers/refine.provider"

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<RefineProvider>
			<AppInitializer>{children}</AppInitializer>
		</RefineProvider>
	)
}
