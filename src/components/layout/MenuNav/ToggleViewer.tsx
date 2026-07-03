"use client"

import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useList } from "@refinedev/core"
import { useEffect } from "react"

export default function ToggleViewer() {
	
	const { result } = useList({
		resource: "access-controls",
		pagination: {
			mode: "off",
		},
	})
	const { accessRoles, currentViewer, setAccessRoles, setCurrentViewer } = useToggleViewerStore()

	useEffect(() => {
		if (!result?.data) return

		setAccessRoles(
			result.data.map((item) => ({
				roleCode: item.roleCode,
				roleAccess: item.roleAccess,
			})),
		)
	}, [result?.data, setAccessRoles])

	return (
		<Select value={currentViewer} onValueChange={setCurrentViewer}>
			<SelectTrigger className="w-40">
				<SelectValue />
			</SelectTrigger>

			<SelectContent>
				{accessRoles.map((option) => (
					<SelectItem key={option.roleCode} value={option.roleCode}>
						{option.roleCode}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
