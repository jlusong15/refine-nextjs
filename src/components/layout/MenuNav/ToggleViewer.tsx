"use client"

import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ACCESS_QUERY_KEY } from "@/constants/access.constants"
import { invalidateAccessQuery } from "@/lib/query"
import { RoleType } from "@/types/access-control.types"
import { useQueryClient } from "@tanstack/react-query"

export default function ToggleViewer() {
	const queryClient = useQueryClient()
	const accessRoles = useToggleViewerStore((s) => s.accessRoles)
	const currentViewer = useToggleViewerStore((s) => s.currentViewer)
	const setCurrentViewer = useToggleViewerStore((s) => s.setCurrentViewer)

	const handleChange = (value: RoleType) => {
		setCurrentViewer(value)
		invalidateAccessQuery(queryClient, ACCESS_QUERY_KEY)
	}

	return (
		<Select value={currentViewer} onValueChange={handleChange}>
			<SelectTrigger className="w-40 text-white">
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
