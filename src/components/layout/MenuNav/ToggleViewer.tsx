"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useList } from "@refinedev/core"
import { useMemo, useState } from "react"

export default function ToggleViewer() {
	const [value, setValue] = useState("ADMIN")

	const { result: accessControls, query } = useList({
		resource: "access-controls",
		pagination: {
			mode: "off",
		},
	})

	const options = useMemo(
		() =>
			(accessControls?.data ?? []).map((item) => ({
				label: item.roleCode,
				value: item.roleCode,
			})),
		[accessControls],
	)

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger className="w-48 text-white border-white/20 bg-transparent cursor-pointer">
				<SelectValue />
			</SelectTrigger>

			<SelectContent>
				{query.isLoading ? (
					<SelectItem value="ADMIN">ADMIN</SelectItem>
				) : (
					options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))
				)}
			</SelectContent>
		</Select>
	)
}
