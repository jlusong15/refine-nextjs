"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DataTableSearchProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	className?: string
}

export function DataTableSearch({
	value,
	onChange,
	placeholder = "Search...",
	disabled = false,
	className = "w-80",
}: DataTableSearchProps) {
	return (
		<div className={`relative ${className}`}>
			<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				className="pl-9"
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}