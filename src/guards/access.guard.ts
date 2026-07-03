"use client"

import { useCan } from "@refinedev/core"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type AccessGuardProps = {
	resource: string
	action: string
	children: React.ReactNode
}

export default function AccessGuard({
	resource,
	action,
	children,
}: AccessGuardProps) {
	const router = useRouter()
	const { data, isLoading } = useCan({
		resource,
		action,
	})

	useEffect(() => {
		if (!isLoading && data && !data.can) {
			router.replace("/403")
		}
	}, [data, isLoading, router])

	if (isLoading) {
		return null // or a loading spinner
	}

	if (!data?.can) {
		return null
	}

	return children
}