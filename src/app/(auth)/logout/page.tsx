"use client"

import { useLogout } from "@refinedev/core"
import { useEffect } from "react"

export default function LogoutPage() {
	const { mutate: logout } = useLogout()

	useEffect(() => {
		logout()
	}, [logout])

	return (
		<div className="flex min-h-screen items-center justify-center">
			<p className="text-muted-foreground">Signing you out...</p>
		</div>
	)
}
