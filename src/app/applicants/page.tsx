"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Applicant } from "@/types/applicants.types"
import { useTable } from "@refinedev/core"
import { ArrowUpDown, Search } from "lucide-react"
import { useState } from "react"

export default function ApplicantsPage() {
	const [search, setSearch] = useState("")

	const {
		result,
		currentPage,
		setCurrentPage,
		pageCount,
		pageSize,
		setPageSize,
		setSorters,
		setFilters,
		tableQuery: { isLoading, error },
	} = useTable<Applicant>({
		resource: "applicants",

		pagination: {
			currentPage: 1,
			pageSize: 10,
		},

		sorters: {
			initial: [
				{
					field: "id",
					order: "desc",
				},
			],
		},
	})

	if (isLoading) return <Loading />

	if (error) return <h3>Error fetching data</h3>

	const handleSearch = (value: string) => {
		setSearch(value)

		setFilters(
			value
				? [
						{
							field: "fullName",
							operator: "contains",
							value,
						},
					]
				: [],
			"replace",
		)
	}

	const handleSort = (field: keyof Applicant) => {
		setSorters([
			{
				field,
				order: "asc",
			},
		])
	}

	return (
		<DefaultPageLayout title="Applicants">
			<div className="space-y-4">
				<div className="relative w-80">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="pl-9"
						placeholder="Search applicant..."
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
					/>
				</div>

				<Table className="text-base mb-2">
					<TableHeader className="bg-muted">
						<TableRow>
							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("id")} className="text-base">
									ID
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>

							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("fullName")} className="text-base">
									Full Name
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>

							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("email")} className="text-base">
									Email
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>

							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("phone")} className="text-base">
									Phone
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>

							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("appliedRole")} className="text-base">
									Applied Role
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>

							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("applicationStatus")} className="text-base">
									Status
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{result.data.map((applicant) => (
							<TableRow key={applicant.id}>
								<TableCell>{applicant.id}</TableCell>
								<TableCell>{applicant.fullName}</TableCell>
								<TableCell>{applicant.email}</TableCell>
								<TableCell>{applicant.phone}</TableCell>
								<TableCell>{applicant.appliedRole}</TableCell>
								<TableCell>{applicant.applicationStatus}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<div className="flex items-center justify-between">
					<div className="space-x-2">
						<Button
							className="border px-3 py-1 rounded"
							disabled={currentPage <= 1}
							onClick={() => setCurrentPage(currentPage - 1)}
						>
							Previous
						</Button>

						<span className="text-base">
							Page {currentPage} of {pageCount}
						</span>

						<Button
							className="border px-3 py-1 rounded"
							disabled={currentPage >= pageCount}
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next
						</Button>
					</div>

					<Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
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
		</DefaultPageLayout>
	)
}
