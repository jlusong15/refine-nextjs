"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"

export interface DataTableColumn<T> {
	key: keyof T
	title: string
	sortable?: boolean
	render?: (row: T) => ReactNode
	className?: string
}

interface DataTableProps<T extends { id: number | string }> {
	data: T[]
	columns: DataTableColumn<T>[]
	isLoading?: boolean
	onSort?: (field: keyof T) => void
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
							<TableHead key={String(column.key)} className={cn("whitespace-nowrap", column.className)}>
								{column.sortable ? (
									<Button
										variant="ghost"
										className="h-auto p-0"
										disabled={isLoading}
										onClick={() => onSort?.(column.key)}
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
								<TableCell key={String(column.key)} className={cn("whitespace-nowrap", column.className)}>
									{column.render ? column.render(row) : String(row[column.key] ?? "")}
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
