"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

type DatePickerProps = {
	value?: Date
	onChange: (date: Date | undefined) => void
	disabled?: boolean
	placeholder?: string
	className?: string
}

export default function DatePicker({
	value,
	onChange,
	disabled = false,
	placeholder = "Pick a date",
	className,
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						type="button"
						variant="outline"
						disabled={disabled}
						className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", className)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />

						{value ? format(value, "PPP") : placeholder}
					</Button>
				</FormControl>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" selected={value} defaultMonth={value} onSelect={onChange} disabled={disabled} />
			</PopoverContent>
		</Popover>
	)
}
