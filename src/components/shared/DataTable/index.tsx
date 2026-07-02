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
}

interface DataTableProps<T extends { id: number | string }> {
	data: T[]
	columns: DataTableColumn<T>[]
	isLoading?: boolean
	onSort?: (field: keyof T) => void
	actions?: (row: T) => React.ReactNode
}

export function DataTable<T extends { id: number | string }>({
	data,
	columns,
	isLoading,
	actions,
	onSort,
}: DataTableProps<T>) {
	return (
		<Table className={cn("mb-2 text-base", isLoading && "pointer-events-none opacity-60")}>
			<TableHeader className="bg-muted">
				<TableRow>
					{columns.map((column) => (
						<TableHead key={String(column.key)}>
							{column.sortable ? (
								<Button variant="ghost" className="text-base" disabled={isLoading} onClick={() => onSort?.(column.key)}>
									{column.title}
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							) : (
								column.title
							)}
						</TableHead>
					))}
					{actions && <TableHead></TableHead>}
				</TableRow>
			</TableHeader>

			<TableBody>
				{data.map((row) => (
					<TableRow key={row.id}>
						{columns.map((column) => (
							<TableCell key={String(column.key)}>
								{column.render ? column.render(row) : String(row[column.key] ?? "")}
							</TableCell>
						))}
						{actions && <TableCell>{actions(row)}</TableCell>}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
