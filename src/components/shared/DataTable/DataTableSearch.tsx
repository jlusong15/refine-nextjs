"use client"

import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/useDebounce"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface DataTableSearchProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	className?: string
	delay?: number
}

export function DataTableSearch({
	value,
	onChange,
	placeholder = "Search...",
	disabled = false,
	className = "w-80",
	delay = 500,
}: DataTableSearchProps) {
	const [search, setSearch] = useState(value)
	const debouncedSearch = useDebounce(search, delay)

	useEffect(() => {
		setSearch(value)
	}, [value])

	useEffect(() => {
		onChange(debouncedSearch)
	}, [debouncedSearch, onChange])

	return (
		<div className={`relative ${className}`}>
			<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				className="pl-9"
				placeholder={placeholder}
				value={search}
				disabled={disabled}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	)
}
