"use client"

import { FormControl } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type SelectOption = {
	label: string
	value: string
}

type SelectFieldProps = {
	value?: string
	onValueChange?: (value: string) => void
	options: SelectOption[]
	placeholder?: string
	className?: string
	disabled?: boolean
}

export function SelectField({
	value,
	onValueChange,
	options,
	placeholder = "Select an option",
	className,
	disabled,
}: SelectFieldProps) {
	return (
		<Select value={value} onValueChange={onValueChange} disabled={disabled}>
			<FormControl>
				<SelectTrigger className={className ?? "w-full"}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
			</FormControl>

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
