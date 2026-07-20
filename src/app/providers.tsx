"use client"

import AppInitializer from "@/components/AppInitializer"
import ErrorPage from "@/components/layout/ErrorPage"
import RefineProvider from "@/providers/refine.provider"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<Suspense fallback={null}>
			<ErrorBoundary fallback={<ErrorPage />}>
				<QueryClientProvider client={queryClient}>
					<RefineProvider>
						<AppInitializer>{children}</AppInitializer>
					</RefineProvider>
				</QueryClientProvider>
			</ErrorBoundary>
		</Suspense>
	)
}
