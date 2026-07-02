"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
	currentPage: number
	pageCount: number
	pageSize: number
	isLoading?: boolean
	setCurrentPage: (page: number) => void
	setPageSize: (size: number) => void
}

export function DataTablePagination({
	currentPage,
	pageCount,
	pageSize,
	isLoading,
	setCurrentPage,
	setPageSize,
}: Props) {
	return (
		<div className="flex items-center justify-between">
			<div className="space-x-2">
				<Button disabled={currentPage <= 1 || isLoading} onClick={() => setCurrentPage(currentPage - 1)}>
					Previous
				</Button>

				<span className="text-base">
					Page {currentPage} of {pageCount}
				</span>

				<Button disabled={currentPage >= pageCount || isLoading} onClick={() => setCurrentPage(currentPage + 1)}>
					Next
				</Button>
			</div>

			<div>
				<Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))} disabled={isLoading}>
					<SelectTrigger className="w-20">
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="5">5</SelectItem>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="20">20</SelectItem>
						<SelectItem value="50">50</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
