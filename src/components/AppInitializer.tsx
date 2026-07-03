"use client"

import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { useList } from "@refinedev/core"
import { useEffect } from "react"
import Loading from "./shared/Loading"

type Props = {
	children: React.ReactNode
}

export default function AppInitializer({ children }: Props) {
	const setAccessRoles = useToggleViewerStore((s) => s.setAccessRoles)

	const { result, query } = useList({
		resource: RESOURCE_NAME.ACCESS_CONTROL,
		pagination: {
			mode: "off",
		},
	})

	useEffect(() => {
		if (!result?.data) return

		setAccessRoles(
			result.data.map((item) => ({
				roleCode: item.roleCode,
				roleAccess: item.roleAccess,
			})),
		)
	}, [result?.data, setAccessRoles])

	if (query.isLoading) {
		return <Loading />
	}

	return children
}
