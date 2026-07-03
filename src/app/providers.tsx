"use client"

import AppInitializer from "@/components/AppInitializer"
import ErrorPage from "@/components/layout/ErrorPage"
import Loading from "@/components/shared/Loading"
import RefineProvider from "@/providers/refine.provider"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<Loading />}>
			<ErrorBoundary fallback={<ErrorPage />}>
				<RefineProvider>
					<AppInitializer>{children}</AppInitializer>
				</RefineProvider>
			</ErrorBoundary>
		</Suspense>
	)
}
