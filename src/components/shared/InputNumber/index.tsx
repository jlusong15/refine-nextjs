"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	value?: number | null
	onChange?: (value: number | null) => void
	allowDecimal?: boolean
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
	({ value = null, onChange, allowDecimal = false, className, min, max, ...props }, ref) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let input = e.target.value
			if (input === "") {
				onChange?.(null)
				return
			}

			input = allowDecimal ? input.replace(/[^\d.]/g, "") : input.replace(/\D/g, "")

			if (allowDecimal) {
				const parts = input.split(".")
				if (parts.length > 2) {
					input = `${parts[0]}.${parts.slice(1).join("")}`
				}
			}

			let number = allowDecimal ? parseFloat(input) : parseInt(input, 10)

			if (Number.isNaN(number)) {
				onChange?.(null)
				return
			}

			if (typeof min === "number") {
				number = Math.max(number, min)
			}

			if (typeof max === "number") {
				number = Math.min(number, max)
			}

			onChange?.(number)
		}

		return (
			<Input
				ref={ref}
				type="text"
				inputMode={allowDecimal ? "decimal" : "numeric"}
				value={value ?? ""}
				onChange={handleChange}
				className={cn(className)}
				{...props}
			/>
		)
	},
)

InputNumber.displayName = "InputNumber"
