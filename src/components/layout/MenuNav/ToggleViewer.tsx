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
	const { options, selectedValue, setOptions, setSelectedValue } = useToggleViewerStore()

	useEffect(() => {
		if (!result?.data) return

		setOptions(
			result.data.map((item) => ({
				label: item.roleCode,
				value: item.roleCode,
			})),
		)
	}, [result?.data, setOptions])

	return (
		<Select value={selectedValue} onValueChange={setSelectedValue}>
			<SelectTrigger className="w-40">
				<SelectValue />
			</SelectTrigger>

			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
