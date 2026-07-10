"use client"

import MenuNav from "@/components/layout/MenuNav"
import { Authenticated } from "@refinedev/core"
import { NavigateToResource } from "@refinedev/nextjs-router"

export default function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Authenticated key="protected" fallback={<NavigateToResource resource="login" />}>
			<div>
				<MenuNav />
				<main>{children}</main>
			</div>
		</Authenticated>
	)
}
