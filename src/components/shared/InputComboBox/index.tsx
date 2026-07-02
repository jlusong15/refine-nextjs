"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import * as React from "react"

export interface Option {
	value: string
	label: string
}

interface InputMultiComboBoxProps {
	value?: string[]
	options: Option[]
	placeholder?: string
	onChange: (value: string[]) => void
	onCreate?: (option: Option) => void
}

export function InputMultiComboBox({
	value = [],
	options,
	placeholder = "Select options...",
	onChange,
	onCreate,
}: InputMultiComboBoxProps) {
	const [open, setOpen] = React.useState(false)
	const [search, setSearch] = React.useState("")

	const filtered = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))

	const exists = options.some((option) => option.label.toLowerCase() === search.toLowerCase())

	const toggleValue = (item: string) => {
		if (value.includes(item)) {
			onChange(value.filter((v) => v !== item))
		} else {
			onChange([...value, item])
		}
	}

	const handleCreate = () => {
		const text = search.trim()

		if (!text) return

		const option = {
			label: text,
			value: text,
		}

		onCreate?.(option)

		if (!value.includes(option.value)) {
			onChange([...value, option.value])
		}

		setSearch("")
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" className="w-full min-h-10 h-auto justify-between">
					<div className="flex flex-wrap gap-1">
						{value.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}

						{value.map((item) => (
							<Badge key={item} variant="secondary" className="flex items-center gap-1">
								{item}

								<X
									className="h-3 w-3 cursor-pointer"
									onClick={(e) => {
										e.preventDefault()
										e.stopPropagation()

										onChange(value.filter((v) => v !== item))
									}}
								/>
							</Badge>
						))}
					</div>

					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[--radix-popover-trigger-width] p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Type here..."
						value={search}
						onValueChange={setSearch}
					/>

					<CommandList>
						<CommandEmpty>No results.</CommandEmpty>

						<CommandGroup>
							{filtered.map((option) => {
								const selected = value.includes(option.value)

								return (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={() => toggleValue(option.value)}
										className="cursor-pointer"
									>
										<Check className={cn("mr-2 h-4 w-4", selected ? "opacity-100" : "opacity-0")} />

										{option.label}
									</CommandItem>
								)
							})}

							{!exists && search.trim() && (
								<CommandItem onSelect={handleCreate} className="cursor-pointer">
									<Plus className="mr-2 h-4 w-4" />
									Add "{search}"
								</CommandItem>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
