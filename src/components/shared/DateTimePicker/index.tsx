"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useMemo } from "react"

type Props = {
	value?: Date
	onChange: (date?: Date) => void
	disabled?: boolean
	placeholder?: string
}

export default function DateTimePicker({ value, onChange, disabled, placeholder = "Select date and time" }: Props) {
	const date = value ?? new Date()

	const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), [])

	const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), [])

	const hour12 = Number(format(date, "h"))
	const minute = date.getMinutes()
	const ampm = format(date, "a")

	const updateDate = (newDate: Date) => {
		onChange(newDate)
	}

	const handleDateChange = (selected?: Date) => {
		if (!selected) return

		selected.setHours(date.getHours())
		selected.setMinutes(date.getMinutes())

		updateDate(selected)
	}

	const handleHourChange = (hour: string) => {
		const d = new Date(date)

		let h = Number(hour)

		if (ampm === "PM" && h !== 12) h += 12
		if (ampm === "AM" && h === 12) h = 0

		d.setHours(h)

		updateDate(d)
	}

	const handleMinuteChange = (minute: string) => {
		const d = new Date(date)

		d.setMinutes(Number(minute))

		updateDate(d)
	}

	const handleAmPmChange = (period: string) => {
		const d = new Date(date)

		let h = d.getHours()

		if (period === "AM" && h >= 12) h -= 12
		if (period === "PM" && h < 12) h += 12

		d.setHours(h)

		updateDate(d)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					disabled={disabled}
					className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />

					{value ? format(value, "PPP p") : placeholder}
				</Button>
			</PopoverTrigger>

			<PopoverContent align="start" className="w-auto space-y-4 p-4">
				<Calendar mode="single" selected={value} defaultMonth={value} onSelect={handleDateChange} />

				<div className="grid grid-cols-3 gap-2">
					<Select value={hour12.toString()} onValueChange={handleHourChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							{hours.map((hour) => (
								<SelectItem key={hour} value={hour.toString()}>
									{hour}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={minute.toString()} onValueChange={handleMinuteChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>

						<SelectContent className="max-h-72">
							{minutes.map((minute) => (
								<SelectItem key={minute} value={minute.toString()}>
									{minute.toString().padStart(2, "0")}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={ampm} onValueChange={handleAmPmChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="AM">AM</SelectItem>

							<SelectItem value="PM">PM</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</PopoverContent>
		</Popover>
	)
}
