"use client"

import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleType } from "@/types/access-control.types"
import { useQueryClient } from "@tanstack/react-query"

export default function ToggleViewer() {
	const queryClient = useQueryClient()
	const accessRoles = useToggleViewerStore((s) => s.accessRoles)
	const currentViewer = useToggleViewerStore((s) => s.currentViewer)
	const setCurrentViewer = useToggleViewerStore((s) => s.setCurrentViewer)

	const handleChange = (value: RoleType) => {
		setCurrentViewer(value)
		console.table(
			queryClient
				.getQueryCache()
				.getAll()
				.map((q) => q.queryKey),
		)
		queryClient.invalidateQueries({
			predicate: (query) => query.queryKey[0] === "access",
		})
	}

	return (
		<Select value={currentViewer} onValueChange={handleChange}>
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
