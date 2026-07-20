"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"

export type DataTableColumnKey<T> = Extract<keyof T, string> | string[]
export interface DataTableColumn<T> {
	key: DataTableColumnKey<T>
	sortKey?: Extract<keyof T, string>
	title: string
	sortable?: boolean
	render?: (row: T) => ReactNode
	className?: string
}

function getValue<T extends Record<string, any>>(item: T, key: DataTableColumnKey<T>): ReactNode {
	let value: unknown

	if (Array.isArray(key)) {
		value = key.reduce((obj, part) => obj?.[part], item)
	} else {
		value = item[key]
	}

	if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
		return value
	}

	return String(value)
}

interface DataTableProps<T extends { id: number | string }> {
	data: T[]
	columns: DataTableColumn<T>[]
	isLoading?: boolean
	onSort?: (key: Extract<keyof T, string>) => void
	actions?: (row: T) => ReactNode
}

export function DataTable<T extends { id: number | string }>({
	data,
	columns,
	isLoading,
	actions,
	onSort,
}: DataTableProps<T>) {
	return (
		<div className="w-full overflow-x-auto rounded-md border">
			<Table className={cn("min-w-max", isLoading && "pointer-events-none opacity-60")}>
				<TableHeader className="bg-muted">
					<TableRow>
						{columns.map((column) => (
							<TableHead
								key={Array.isArray(column.key) ? column.key.join("-") : column.key}
								className={cn("whitespace-nowrap", column.className)}
							>
								{column.sortable ? (
									<Button
										variant="ghost"
										className="h-auto p-0"
										disabled={isLoading}
										onClick={() => column.sortKey && onSort?.(column.sortKey)}
									>
										{column.title}
										<ArrowUpDown className="ml-2 h-4 w-4" />
									</Button>
								) : (
									column.title
								)}
							</TableHead>
						))}
						{actions && <TableHead className="w-24 whitespace-nowrap text-right">Actions</TableHead>}
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map((row) => (
						<TableRow key={row.id}>
							{columns.map((column) => (
								<TableCell
									key={Array.isArray(column.key) ? column.key.join("-") : column.key}
									className={cn("whitespace-nowrap", column.className)}
								>
									{column.render ? column.render(row) : (getValue(row, column.key) ?? "")}
								</TableCell>
							))}

							{actions && <TableCell className="text-right whitespace-nowrap">{actions(row)}</TableCell>}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
